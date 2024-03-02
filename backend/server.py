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
    conversation = data["conversation"]
    for i in range(0, len(conversation)):
        if i%2 == 0:
            conversation[i] = "Interviewer: " + conversation[i]
        else:
            conversation[i] = "User: " + conversation[i]

    str_convo = ""
    for convo in conversation:
        str_convo += "\n" + convo
    
    
    print(str_convo)
    rating_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Look at the following behavioural interview given by the user and then rate it out of 5 for each of the following catagories.\n 1. relevance: whether the response directly address the question asked?\n 2. clarity: is the response clear and understandable?\n 3. depth: does the response demonstrate a deep understanding of the topic or situation?\n 4. examples: do they provide specific examples or experiences to support their response?\n You must give a score for all catagories."},
            {"role": "user", "content": str_convo}
        ]
    )

    rating = cutoffRole(rating_completion.choices[0].message.content)
    return rating


if __name__ == '__main__':
    app.run(debug=True)