import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask, request


app = Flask(__name__)


load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()


with open('rating_preprompt.txt', 'r') as file:
    rating_preprompt = file.read()



def cutoffRole(message):
    prefix = "Interviewer: "
    if message.startswith(prefix):
        return message[len(prefix):]
    else:
        return message

# GET request that provides a greeting from interviewer
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

# Given the most recent dialog (last 2), endpoint returns a response to the user and a behavioural question.
# Example input:
# {
#     "prev-question": "That's great to hear! Can you share a time when you had to work under pressure to meet a deadline?",
#     "prev-answer": "Sorry, I can't think of anything"
#     "company": "amazon"
# }
# output:
# No problem! Can you describe a situation where you had to persuade a team member to see things from your perspective?
@app.route('/question', methods=['POST'])
def question():
    data = request.json
    
    
    with open("company/"+data["company"]+'.txt', 'r') as file:
        company_preprompt = file.read()
    
    print(company_preprompt)
    question_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Respond to the user and ask the user a behavioural question. (respond in one sentence and don't add any punctuation). Use the following examples of questions to base the question you ask very closely.\n" + company_preprompt},
            {"role": "assistant", "content": data["prev-question"]},
            {"role": "user", "content": data["prev-answer"]}
        ]
    )

    question = cutoffRole(question_completion.choices[0].message.content)
    return question

# Given the whole conversation (as a list) starting from the greeting of the interviewer, returns a rating of the interviewee.
# Example input:
# {
#         "conversation": ["Hello! Thank you for coming in today.", "Thank you, I am happy to", "That's great to hear! Can you share a time when you had to work under pressure to meet a deadline?", "Sorry, I can't think of anything", "No problem! Can you describe a situation where you had to persuade a team member to see things from your perspective?", "Can't think of anything again"]
# }
# output as string:
# 1. relevance: 1/5 (The responses do not directly address the questions asked)
# 2. clarity: 5/5 (The responses are clear and understandable)
# 3. depth: 1/5 (The responses lack depth and do not demonstrate a deep understanding of the topics)
# 4. examples: 1/5 (No specific examples or experiences are provided to support the responses)
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

    rating_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": rating_preprompt},
            {"role": "user", "content": str_convo}
        ]
    )

    rating = rating_completion.choices[0].message.content
    return rating


if __name__ == '__main__':
    app.run(debug=True)