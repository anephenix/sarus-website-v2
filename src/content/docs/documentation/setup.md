---
title: Setup
description: This describes how to setup Sarus in your code
---

Once you have Sarus installed in your project, you can load it into your code like this:

```javascript
import Sarus from '@anephenix/sarus';

// The url to the WebSocket server we want to connect to:
const url = 'wss://ws.anephenix.com';

// Instantiate the instance of Sarus
const sarus = new Sarus({ url });
```

This will do the following:

1. Setup a new `WebSocket` instance and connect to the WebSocket server that is available at `wss://ws.anephenix.com`;
2. Bind an event listener function on the WebSocket instance's `close` event. The event listener function will try to reconnect to the WebSocket server after 1000ms by default. 

At this stage we have automatic reconnections and event listener rebinding in place. 

## Receiving messages

If we want to add a simple way to log out messages being sent from the WebSocket server, we can write this:

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

This will log out messages coming from the WebSocket server. It's then up to you what you want to do with those messages.

## Sending messages

You can send text-based messages to the server like this:

```javascript
sarus.send('Hello world');
```

The message is sent as a UTF-8 string payload. 

You can also send other string-encoded payloads like JSON objects encoded with `JSON.stringify`, or even binary data (arraybuffer or blob).

For more on that, check out the section on [sending messages](/documentation/sending-messages).

## Next steps

This page has walked through a basic use case of using Sarus, but there are lots of options for configuring Sarus. The other pages will cover what those options are and how they work.