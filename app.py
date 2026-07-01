import os
from flask import Flask, request, jsonify, send_from_directory
from anthropic import Anthropic
import requests

app = Flask(__name__, static_folder='.')

# ==========================================
# CONFIGURATION & API KEYS
# Keep these safe! Use environment variables.
# ==========================================
CLAUDE_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "your-claude-api-key-here")
# Google Sheets Webhook URL from your Apps Script Deployment
GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/XXXXX/exec" 

# Initialize the Anthropic client
anthropic_client = Anthropic(api_key=CLAUDE_API_KEY)


# ==========================================
# ROUTING FOR FRONTEND FILES
# ==========================================

@app.route('/')
def index():
    """Serves the main index.html file."""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serves styles.css, script.js, or images if requested."""
    return send_from_directory(app.static_folder, path)


# ==========================================
# EPIC 4: BACKEND INTEGRATIONS
# ==========================================

@app.route('/api/chat', methods=['POST'])
def chat_with_claude():
    """
    Handles AI Financial Advisory requests by forwarding the user prompt
    to Claude AI securely without exposing the API key to the frontend.
    """
    data = request.json or {}
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    try:
        # Request a response from Claude AI
        response = anthropic_client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=500,
            temperature=0.3,
            system="You are FinWise AI, an intelligent financial advisor. Provide concise, helpful advice on loans, EMIs, and credit scores.",
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        # Extract the text content from the response object
        ai_reply = response.content[0].text
        return jsonify({"reply": ai_reply})

    except Exception as e:
        return jsonify({"error": f"Failed to communicate with Claude AI: {str(e)}"}), 500


@app.route('/api/log-finance', methods=['POST'])
def log_to_google_sheets():
    """
    Receives financial parameters from the client and forwards them
    to your Google Sheets Webhook App Script.
    """
    data = request.json or {}
    
    if not GOOGLE_SHEETS_WEBHOOK_URL or "XXXXX" in GOOGLE_SHEETS_WEBHOOK_URL:
        return jsonify({"status": "mock_success", "message": "Backend received data, but Google Sheets URL is not configured yet."})

    try:
        # Securely forward the payload to the Google Sheets Apps Script Webhook
        response = requests.post(GOOGLE_SHEETS_WEBHOOK_URL, json=data, timeout=10)
        
        if response.status_code == 200:
            return jsonify({"status": "success", "message": "Data successfully sent to Google Sheets"})
        else:
            return jsonify({"status": "error", "message": "Google Sheets script rejected data"}), response.status_code

    except Exception as e:
        return jsonify({"status": "error", "message": f"Connection to Sheets failed: {str(e)}"}), 500


if __name__ == '__main__':
    # Run the app locally on port 5000
    app.run(debug=True, port=5000)
