---
title: Receiving messages
description: This document describes how to handle receiving messages
---

<div class="in-progress">NOTE - page is a work in progress</div>

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