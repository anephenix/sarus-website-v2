---
title: Why use Sarus?
description: This page explains the issues with using WebSockets, and how Sarus helps to solve them.
---

WebSockets are great for realtime data transmission, but they are very brittle when it comes to handling interruptions to network connectivity.

They suffer from these issues:

## WebSockets do not reconnect automatically

A WebSocket connection could go down at anytime due to losing internet connectivity, or if the server handling the WebSocket connection goes down. When this happens, the WebSocket client will close the connection, and it will not reconnect.

In my opinion, it would be great if there was an option to call `websocket.reconnect()` on a closed WebSocket instance.

So how do you re-establish the connection?

Well, you have to write code that does the following:

1. Write a function that will create a new WebSocket instance.
2. Attach that as an event listener function on the existing WebSocket's `close` event.
3. Attach that as an event listener function on the new WebSocket instance, inside of the function in step 1.

In short, you have to write code to handle re-establishing a connection.

## You have to attach event listeners again

When you create new WebSocket instances to re-establish the connection, not only do you need to attach a function to listen on the `close` event, but you also need to re-attach all of the other event listener functions that you had on the existing WebSocket instance.

And you need to setup the code so that this happens every time a new WebSocket instance is created to replace a closed WebSocket instance.

Again, it would be great if there was an option to call `websocket.reconnect()` on a closed WebSocket instance so that you don't have to do this.

## Messages sent while the connection is down are lost

If the WebSocket instance's readyState is 3 (meaning closed), if you attempt to send messages via the WebSocket instance, not only are the messages not sent, but they are not kept for sending later.

In short, they are lost.

If you want to prevent that, then you need to keep messages in a list or queue of some kind, and send them only when the WebSocket instance's `readyState` value is 1 (meaning open). 

In short, you have to write code to implement a Message Queue and use it for dispatching messages depending on the WebSocket's connection status (readyState).

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
