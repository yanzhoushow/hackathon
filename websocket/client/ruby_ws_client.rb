require 'faye/websocket'
require 'eventmachine'
require 'json'

message = {
  "action": "route_key",
  "data": "hello_world"
}

url = "wss://<gateway-id>.execute-api.us-east-1.amazonaws.com/dev"

EM.run {
  ws = Faye::WebSocket::Client.new(url)

  ws.on :open do |event|
    p [:open]
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    p [:message, event.data]
    msg = JSON.parse(event.data)
    EM.stop
  end

  ws.on :close do |event|
    p [:close, event.code, event.reason]
    ws = nil
  end
}
