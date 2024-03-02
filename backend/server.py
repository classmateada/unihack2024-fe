import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask, request

app = Flask(__name__)
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

def cutoffRole(message):
    prefix = "Interviewer: "
    if message.startswith(prefix):
        return message[len(prefix):]
    else:
        return message

@app.route('/greeting', methods=['GET'])
def greeting():
    greetings_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Greet and welcome the user first. Do not start asking behavioural questions. (respond in one sentence and don't add any punctuation)"}
        ]
    )

    greetings = cutoffRole(greetings_completion.choices[0].message.content)
    return greetings

@app.route('/question', methods=['POST'])
def question():
    data = request.json
    question_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Respond to the user and ask the user a behavioural question. (respond in one sentence and don't add any punctuation)"},
            {"role": "assistant", "content": data["prev-question"]},
            {"role": "user", "content": data["prev-answer"]}
        ]
    )

    question = cutoffRole(question_completion.choices[0].message.content)
    return question

@app.route('/rating', methods=['POST'])
def rating():
    data = request.json
    msgs = [{"role": "assistant", "content": conversation} for conversation in data["conversation"]]
    for i in range(0, len(msgs)):
        if i%2 == 1:
            msgs[i]["role"] = "user"

    res = [
            {"role": "system", "content": "Give a rating out of 10 on how well they did and why they recieved that result. (##IMPORTANT Do not ask anymore questions and don't add any punctuation)"}
        ] + msgs
    print(res)
    rating_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=res
    )

    rating = cutoffRole(rating_completion.choices[0].message.content)
    return rating

if __name__ == '__main__':
    app.run(debug=True)