import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask

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

@app.route('/greeting')
def greeting():
    greetings_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Greet and welcome the user first. Do not start asking behavioural questions. (respond in one sentence)"}
        ]
    )

    greetings = cutoffRole(greetings_completion.choices[0].message.content)
    
    return greetings







if __name__ == '__main__':
    app.run(debug=True)