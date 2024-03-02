import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()
# Access the API key from the environment
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()


def cutoffRole(message):
    prefix = "Interviewer: "
    if message.startswith(prefix):
        return message[len(prefix):]
    else:
        return message


# greetings
greetings_completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Greet and welcome the user first. Do not start asking behavioural questions. (respond in one sentence)"}
  ]
)

greetings = cutoffRole(greetings_completion.choices[0].message.content)
print(greetings)

# first question
first_question_completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Respond to the user and ask the user a behavioural question. (respond in one sentence)"},
    {"role": "assistant", "content": greetings},
    {"role": "user", "content": "Hi I am ready to start"}
  ]
)

first_question = cutoffRole(first_question_completion.choices[0].message.content)
print(first_question)


# second question
second_question_completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Respond to the user and ask the user a second behavioural question. (respond in one sentence)"},
    {"role": "assistant", "content": greetings},
    {"role": "user", "content": "Hi I am ready to start"},
    {"role": "assistant", "content": first_question},
    {"role": "user", "content": "I am not really sure, i can't recall any experiences."}
  ]
)

second_question = cutoffRole(second_question_completion.choices[0].message.content)
print(second_question)

# rating
rating_completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an interviewer asking behavioural questions, perform a mock interview with the user. Respond to the user and give a rating on how well they did and why they recieved that result. (respond in one sentence)"},
    {"role": "assistant", "content": greetings},
    {"role": "user", "content": "Hi I am ready to start"},
    {"role": "assistant", "content": first_question},
    {"role": "user", "content": "I am not really sure, i can't recall any experiences."},
    {"role": "assistant", "content": second_question},
    {"role": "user", "content": "Again I am not really sure, i can't recall any experiences."}
  ]
)

rating = cutoffRole(rating_completion.choices[0].message.content)
print(rating)


