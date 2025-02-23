from machine import Pin
import time
import network
import urequests
import ujson


led = Pin(8, Pin.OUT) 
led.value(0)
time.sleep(2)
led.value(1)# import time
pir = Pin(0, Pin.IN, Pin.PULL_DOWN)
  # Configuración de Wi-Fi
WIFI_SSID = "(WIFINAME)"
WIFI_PASSWORD = "(WIFIPASSWORD)"

  # Configuración de la API
API_URL = "http://192.168.1.200:5000/send_whatsapp" 

  # Función para conectar a Wi-Fi
def connect_wifi():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print("Conectando a Wi-Fi...")
        sta_if.active(True) 
        sta_if.connect(WIFI_SSID, WIFI_PASSWORD)
        while not sta_if.isconnected():
            time.sleep(1)
    print("Conexión Wi-Fi exitosa!")
    print("Dirección IP:", sta_if.ifconfig()[0])

  # Función para enviar un mensaje por WhatsApp
def send_whatsapp_message():
    try:
        payload = {
            "to": "+54(PHONE_NUMBER)",
            "message": "Movimiento detectado!"
        }
        json_payload = ujson.dumps(payload) 
        headers = {
            "Content-Type": "application/json"
        }
        response = urequests.post(API_URL, data=json_payload, headers=headers)  
        print("Código de respuesta:", response.status_code)
        print("Respuesta de la API:", response.text)
        response.close()
    except Exception as e:
        print("Error al enviar el mensaje:", e)

  # Conectar a Wi-Fi 
time.sleep(3)  # import time
connect_wifi()
print("hola")

time.sleep(30)

print("Esperando deteccion")
led.value(0)

while True:
    if pir.value():
      for i in range(3):
        led.value(1)
        time.sleep(0.1)  # import time
        led.value(0)
      
      print("enviando mensaje")
      led.value(1)
      send_whatsapp_message() 
      time.sleep(30)  
      led.value(0)

   
