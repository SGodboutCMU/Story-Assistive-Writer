from flask import Flask, request, jsonify
import openai
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def prompt(AIMessages):
    response = openai.chat.completions.create(
        model = 'gpt-3.5-turbo',
        temperature = 1.25,
        messages=AIMessages,
     )
    return response.choices[0].message.content
     

@app.route('/ai', methods=['POST'])
def call_prompt():
    persona = "You are an AI assistant to help writers evolve their story ideas, plot, characters, and settings. Based on the information you are given, provide advice on possible solutions on the questions prompted by the user. Avoid creating actual writing for the story, and instead give suggestions and tips in detail. If the amount of information is not sufficient, prompt the user for more information on that question. Assume the story points given are in chronological order. Consider the genres when constructing the responses, and if there are multiple genres, consider the combination of the genre in an equal manner in the responses. Consider each question individually and avoid using information from other questions in your answers. Before each answer, give a title for that answer."
    data = request.get_json()
    storyData = data['storyData']
    
    #genres = data['genres']
    #characters = data['characters']
    #settings = data['settings']
    #questions = data['questions']
    #story_points = data['storyPoints']
    
    AIMessages = []
    AIMessages.append({"role": "system", "content": persona})
    #for elem in characters:
    #    AIMessages.append({"role": "system", "content": "Character: " + elem})
    #for elem in settings:
    #    AIMessages.append({"role": "system", "content": "Setting: "+ elem})
    #for elem in genres:
    #    AIMessages.append({"role": "system", "content": "Genre: "+ elem})
    #for elem in story_points:
    #    AIMessages.append({"role": "system", "content": "Story Point: "+ elem})
    #for elem in questions:
    #   AIMessages.append({"role": "system", "content": "Question: "+ elem})

    result = prompt(AIMessages)
    return jsonify({'fullStory': result})

@app.route('/getai', methods=['POST'])
def get_function():
    data = request.get_json()  # Get JSON data from the request body
    # Access the data fields sent from the client-side JavaScript
    genres = data['genres']
    characters = data['characters']
    settings = data['settings']
    questions = data['questions']
    story_points = data['storyPoints']
    story_id = data['storyId']
    
    inputs = {
        'genres': genres,
        'characters': characters,
        'settings': settings,
        'questions': questions,
        'storyPoints': story_points,
        'storyId': story_id
    }

    persona = "You are an AI assistant to help writers evolve their story ideas, plot, characters, and settings. Based on the information you are given, provide advice on possible solutions on the questions prompted by the user. Avoid creating actual writing for the story, and instead give suggestions and tips in detail. If the amount of information is not sufficient, prompt the user for more information on that question. Assume the story points given are in chronological order. Consider the genres when constructing the responses, and if there are multiple genres, consider the combination of the genre in an equal manner in the responses. Consider each question individually and avoid using information from other questions in your answers. Before each answer, give a title for that answer."
    AIMessages = []
    AIMessages.append({"role": "system", "content": persona})
    for elem in characters:
        AIMessages.append({"role": "system", "content": "Character: " + elem})
    for elem in settings:
        AIMessages.append({"role": "system", "content": "Setting: "+ elem})
    for elem in genres:
        AIMessages.append({"role": "system", "content": "Genre: "+ elem})
    for elem in story_points:
        AIMessages.append({"role": "system", "content": "Story Point: "+ elem})
    for elem in questions:
       AIMessages.append({"role": "system", "content": "Question: "+ elem})
    
    result = prompt(AIMessages)

    return jsonify({'fullStory': result})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')