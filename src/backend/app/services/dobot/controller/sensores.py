import serial
import RPi.GPIO as GPIO
import time
import requests
import json
from dotenv import load_dotenv
import os

# Configuração do GPIO
GPIO.setmode(GPIO.BCM)
GPIO_PIN = 17
GPIO.setup(GPIO_PIN, GPIO.IN)

# Configuração da porta serial
port = "/dev/ttyAMA0"
baudrate = 9600

load_dotenv()
ip_pc = os.getenv("IP_PC")
def ler(ser):
    try:
        # Ler GPIO
        estado = GPIO.input(GPIO_PIN)
        
        # Ler QRCode da serial
        qr_code = ser.readline().decode('utf-8', errors='ignore').strip()

        if estado:
            ir_estado = 'Alto'
        else: 
            ir_estado = 'Baixo'

        print(f"Estado do pino {GPIO_PIN}: {ir_estado}")
        
        payload = json.dumps({"IR": ir_estado})
        headers = {'Content-Type': 'application/json'}
        try:
            response = requests.post(f'http://{ip_pc}:5000/sensores', data=payload, headers=headers)
            print(f"Enviado por HTTP: status {response.status_code}")
        except Exception as e:
            print(f"Erro ao enviar por HTTP: {e}")
            
        if qr_code:
            print(f"QR Code recebido: {qr_code}")

            payload = json.dumps({"qr_code": qr_code})
            headers = {'Content-Type': 'application/json'}
            try:
                response = requests.post(f'http://{ip_pc}:5000/qrcode-response', data=payload, headers=headers)
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
            print("Aguardando dados do QR Code e infrevermelho...")
            while True:
                ler(ser)

    except KeyboardInterrupt:
        print("Encerrando programa...")
    finally:
        GPIO.cleanup()
