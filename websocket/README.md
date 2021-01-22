## Why websocket
- REST API 
  - Backend receives and responds to requests
  - open/closse connection needlessly
- WebSocket API supports two-way communication between client apps and backend
  - Backend can send callback messages to connected clients.
  - single request to open WebSocket connection, resuse same connection from client to server
    - removes overhead
  - use case: server-side -> scraper service
