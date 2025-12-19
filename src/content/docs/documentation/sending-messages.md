---
title: Sending messages
description: This document describes the options around sending messages
---

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

### Handling binary messages

WebSockets can be used to transmit either UTF-8 strings or binary data (in the form of an Arry Buffer or a Blob).

In order to ensure that the WebSocket is handling that, you'll want to set the binary type on the WebSocket. You can do that when you instantiate the Sarus instance:

```javascript
const sarus = new Sarus({
    binaryType: 'arraybuffer' // or 'blob'
});
```
