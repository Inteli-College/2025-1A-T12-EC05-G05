import serial
import RPi.GPIO as GPIO
import time
import requests
import json

# Configuração do GPIO
GPIO.setmode(GPIO.BCM)
GPIO_PIN = 17
GPIO.setup(GPIO_PIN, GPIO.IN)

# Configuração da porta serial
port = "/dev/ttyAMA0"
baudrate = 9600

def ler(ser):
    try:
        # Ler GPIO
        estado = GPIO.input(GPIO_PIN)
        print(f"Estado do pino {GPIO_PIN}: {'Alto' if estado else 'Baixo'}")

        # Ler QRCode da serial
        line = ser.readline().decode('utf-8', errors='ignore').strip()
        if line:
            print(f"QR Code recebido: {line}")

            # Enviar para API
            payload = json.dumps({"qr_code": line})
            headers = {'Content-Type': 'application/json'}
            try:
                response = requests.post('http://10.128.0.194:5000/qrcode-response', data=payload, headers=headers)
                print(f"Enviado por HTTP: status {response.status_code}")
            except Exception as e:
                print(f"Erro ao enviar por HTTP: {e}")

        time.sleep(0.5)

    except serial.SerialException as e:
        print(f"Erro ao acessar a porta serial: {e}")
    except KeyboardInterrupt:
        print("Encerrando leitura.")
        GPIO.cleanup()

if __name__ == "__main__":
    try:
        with serial.Serial(port, baudrate, timeout=1) as ser:
            print(f"Conectado à porta {port} a {baudrate} baud.")
            print("Aguardando dados do QR Code...")
            while True:
                ler(ser)
    except KeyboardInterrupt:
        print("Encerrando programa...")
    finally:
        GPIO.cleanup()
