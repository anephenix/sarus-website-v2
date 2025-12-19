---
title: Disconnecting
description: This describes options for disconnecting the WebSocket client.
---

## Disconnecting a WebSocket connection

There may be a case where you wish to close a WebSocket connection (such as when logging out of a service). Sarus provides a way to do that:

```javascript
sarus.disconnect();
```

Calling that function on the sarus client will do 2 things:

- Set the reconnectAutomatically flag to false.
- Close the WebSocket connection.

Event listeners listening on the WebSocket's close event will still trigger, but the client will not attempt to reconnect automatically.

If you wish to close the WebSocket but not override the reconnectAutomatically flag, pass this:

```javascript
sarus.disconnect(true);
```

The client will attempt to reconnect automatically.

