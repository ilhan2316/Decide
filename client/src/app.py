from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return 'Flask server is running!'

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/api/quote', methods=['GET'])
def get_quote():
    quotes = [
        "Trust your intuition",
        "Follow your heart",
        "Take the leap",
        "Stay the course",
        "Consider all options carefully",
        "Sleep on it",
        "Ask a trusted friend",
        "The answer is within you",
        "Change can be good",
        "Stability has value too"
    ]
    return jsonify({
        "quote": random.choice(quotes),
        "length": len(quotes)  # Adding length property for the React app
    })

if __name__ == '__main__':
    app.run(debug=True)
