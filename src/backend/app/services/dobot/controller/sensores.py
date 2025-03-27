import serial
import RPi.GPIO as GPIO
import time
from threading import Thread
import requests
import json  # Importa o módulo json para converter os dados
from flask import Flask, request, jsonify

# Configuração do Flask
app = Flask(__name__)

# Configuração do GPIO
GPIO.setmode(GPIO.BCM)
GPIO_PIN = 17
GPIO.setup(GPIO_PIN, GPIO.IN)

def ler_gpio():
    try:
        while True:
            estado = GPIO.input(GPIO_PIN)  # Lê o estado do pino
            print(f"Estado do pino {GPIO_PIN}: {'Alto' if estado else 'Baixo'}")
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("Encerrando leitura GPIO...")
        GPIO.cleanup()

def ler_qrcode():
    port = "/dev/ttyAMA0"
    baudrate = 9600

    try:
        with serial.Serial(port, baudrate, timeout=1) as ser:
            print(f"Conectado à porta {port} a {baudrate} baud.")
            print("Aguardando dados do QR Code...")

            while True:
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    print(f"QR Code recebido: {line}")
                    
                    # Converter o conteúdo da variável 'line' para JSON
                    try:
                        payload = json.dumps({"qr_code": line})
                        headers = {'Content-Type': 'application/json'}
                        response = requests.post('http://10.128.0.194:5000/qrcode-response', data=payload, headers=headers)
                        print(f"Enviado por HTTP: status {response.status_code}")
                    except Exception as e:
                        print(f"Erro ao enviar por HTTP: {e}")
    except serial.SerialException as e:
        print(f"Erro ao acessar a porta serial: {e}")
    except KeyboardInterrupt:
        print("Encerrando leitura do QR Code.")

@app.route("/status", methods=["GET"])
def status():
    return jsonify({"message": "Servidor rodando"}), 200

if __name__ == "__main__":
    # Criando threads para rodar as duas funções em paralelo
    thread_gpio = Thread(target=ler_gpio, daemon=True)
    thread_qrcode = Thread(target=ler_qrcode, daemon=True)

    # Iniciando as threads
    thread_gpio.start()
    thread_qrcode.start()

    # Iniciando o servidor Flask
    app.run(debug=True, host="0.0.0.0", port=5000)