---
title: Sending messages
description: This document describes the options around sending messages
---

<div class="in-progress">NOTE - page is a work in progress</div>

## Sending messages to the WebSocket server

To send a message to the WebSocket server, you can write this:

```javascript
sarus.send('Hello from the client');
```

If you are wanting to send JSON payloads to the server, you can encode the JSON payload like this before sending it:

```javascript
const payload = {name: "Bob", message: "Hi everybody"};

// Encode the JSON payload before sending it
const encodedPayload = JSON.stringify(payload);

sarus.send(encodedPayload);
```

If you are sending binary data, you can also do that. There will be more coming on that in the future.