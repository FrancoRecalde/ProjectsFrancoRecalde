from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS
from dotenv import load_dotenv
import os
app = Flask(__name__)
CORS(app)



ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = 'whatsapp:+14155238886'  # Número de Twilio sandbox

# Inicializar el cliente de Twili
client = Client(ACCOUNT_SID, AUTH_TOKEN)

# Ruta para enviar mensajes por WhatsApp
@app.route('/send_whatsapp', methods=['POST'])
def send_whatsapp():
    print("Headers:", request.headers)
    print("Raw Data:", request.data)  # Muestra el JSON recibido en bruto
    print("Parsed JSON:", request.get_json(silent=True))  # Intenta decodificar el JSON

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "JSON inválido"}), 400  # Devuelve error si no se pudo decodificar

    to_number = data.get("to")
    message_body = data.get("message")

    if not to_number or not message_body:
        return jsonify({"error": "Faltan parámetros"}), 400

    try:
        message = client.messages.create(
            body=message_body,
            from_=TWILIO_PHONE_NUMBER,
            to=f'whatsapp:{to_number}'
        )
        return jsonify({"status": "Mensaje enviado", "message_sid": message.sid}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/hola', methods=['GET'])
def hola():
    return 'hola yor'
if __name__ == '__main__':
  app.run(host='192.168.1.200', port=5000, debug=True)