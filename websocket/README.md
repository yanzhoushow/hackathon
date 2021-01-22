## Why websocket
- REST API 
  - Backend receives and responds to requests
  - open/closse connection needlessly
- WebSocket API supports two-way communication between client apps and backend
  - Backend can send callback messages to connected clients.
  - single request to open WebSocket connection, resuse same connection from client to server
    - removes overhead
  - use case: server-side -> scraper service

## Websocket API
- Incoming JSON messages are directed to backend integrations based on routes that configured. 
- Non-JSON messages are directed to a $default route configured.

## Websock API Routes
- $connect route
  - executed while the connection is being established
- $disconnect route
  - connection is closed
  - best-effort event (no guarantee)
- $default route
