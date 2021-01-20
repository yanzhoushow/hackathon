#  pip install websocket-client
from websocket import create_connection

ws = create_connection("ws://localhost:8080/websocket")
ws.send("Hello, World")

result =  ws.recv()
print f"Received #{result}"

ws.close()
