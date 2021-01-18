## Why websocket
- REST requests open/closse connection needlessly
- websocket
  - single request to open WebSocket connection, resuse same connection from client to server
    - removes overhead
  - use case: server-side -> scraper lambda
