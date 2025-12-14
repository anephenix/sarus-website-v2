---
title: Why use Sarus?
description: This page explains the issues with using WebSockets, and how Sarus helps to solve them.
---

WebSockets are great for realtime data transmission, but they are very brittle when it comes to handling interruptions to network connectivity.

They suffer from these issues:

## WebSockets do not reconnect automatically

A WebSocket connection could go down at anytime due to losing internet connectivity, or if the server handling the WebSocket connection goes down. When this happens, the WebSocket client will close the connection. It will not attempt to reconnect. If you want to re-establish the WebSocket connection, you have to create a new `WebSocket` instance on the client.

In my opinion, it would be great if there was an option to call `websocket.reconnect()` on a closed WebSocket instance.

## You have to attach event listeners again

When you create new WebSocket instances to re-establish the connection, you have to re-attach all the event listeners that you had originally setup on the previous WebSocket instance.

Therefore you need to setup your code to handle doing this every time you create a new WebSocket instance.

## Messages sent while the connection is down are lost

When the WebSocket connection is down, if you attempt to send messages via the WebSocket instance, not only are the messages not sent, but they are not kept for sending later. In short, they are lost.

Therefore, if you want to send messages while the WebSocket connection is down, you have to implement your own queuing mechanism to store messages until the connection is re-established and open.

In short, you end up writing a bit of code to handle these issues. Perhaps a library that does all that for you would be helpful?

## Introducing Sarus

Sarus is a JavaScript library that improves using WebSockets on the frontend. It acts as a wrapper around the native `WebSocket` API, providing additional features such as automatic reconnections, re-attaching event listener bindings, and message queuing.

Let's look at how it handles each issue.

### Automatic reconnections

Sarus automatically attempts to reconnect the WebSocket connection if it is lost.

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({ url: 'wss://ws.anephenix.com' });
```

The reconnection attempts are made at a configurable interval, and you can specify the maximum number of reconnection attempts before giving up.

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	retryConnectionDelay: 500, // equivalent to 500ms
});
```

If however you wanted to prevent Sarus from automatically reconnecting, you can do so:

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	reconnectAutomatically: false,
});
```

### No need to re-attach event listeners

When Sarus re-establishes the WebSocket connection, it automatically re-attaches all the event listeners that were bound to the original WebSocket instance. 

Set them up just once and you're good to go.

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({ url: 'wss://ws.anephenix.com' });
```

### Message queuing

Sarus implement a message queueing system that ensures that messages are sent only if the WebSocket connection is open.

### Message queue persistence

Normally if a page stops running, users will tend to refresh the page, or maybe close it and open it again later.

In such cases, any messages that were queued up in memory would be lost.

However, Sarus provides a way to persist the message queue. The messages in the queue can be stored in either session storage (for page reloads on the same tab):

```javascript
import Sarus from '@anephenix/sarus';
const sarus = new Sarus({
    url: 'wss://ws.anephenix.com',
    storageType: 'session',
});
```
Or for longer-term persistence, you can use local storage:

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	storageType: 'local',
});
```

This way, should you wish to guarantee message delivery after a page refresh or closure, you can do so by persisting the message queue.
