from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER', 'your-email@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS', 'your-app-password')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER', 'your-email@gmail.com')

mail = Mail(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/content")
def get_content():
    """API endpoint to fetch content from content.json"""
    try:
        with open('content.json', 'r') as f:
            content = json.load(f)
        return jsonify(content)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/contact", methods=["POST"])
def send_email():
    """API endpoint to handle contact form submissions"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject', 'Portfolio Contact Form')
        message = data.get('message')
        
        if not all([name, email, message]):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Create email message
        msg = Message(
            subject=f"Portfolio Contact: {subject}",
            recipients=[app.config['MAIL_USERNAME']],
            reply_to=email
        )
        
        msg.body = f"""
New message from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This message was sent from your portfolio contact form.
        """
        
        # Send email
        mail.send(msg)
        
        return jsonify({"success": True, "message": "Email sent successfully!"}), 200
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({"error": "Failed to send email. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
