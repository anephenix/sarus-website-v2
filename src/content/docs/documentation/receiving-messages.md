---
title: Receiving messages
description: This document describes how to handle receiving messages
---

## Listening for messages coming from the WebSocket server

Setting up listening for messages from the WebSocket server can be done like this:

```javascript
/*
    This is the event listener function that we will use to 
    log out messages coming from the WebSocket server
*/
function message (event) {
    console.log(event.data);
}

// Attach the function to the `message` event
sarus.on('message', message);
```

In this case, we're assuming that the WebSocket message is a string. 

If it is a JSON payload, then we will need to parse it like this:

```javascript
function message (event) {
    const parsedJSON = JSON.parse(event.data);
    console.log(parsedJSON);
}

sarus.on('message', message);
```

### Handling binary messages

WebSockets can be used to transmit either UTF-8 strings or binary data (in the form of an Arry Buffer or a Blob).

In order to ensure that the WebSocket is handling that, you'll want to set the binary type on the WebSocket. You can do that when you instantiate the Sarus instance:

```javascript
const sarus = new Sarus({
    binaryType: 'arraybuffer' // or 'blob'
});
```