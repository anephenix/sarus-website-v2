---
title: Why use Sarus?
description: This page explains the issues with using WebSockets, and how Sarus helps to solve them.
---

WebSockets are great for realtime data transmission, but they are very brittle when it comes to handling interruptions to network connectivity.

They suffer from these issues:

1. [WebSockets do not reconnect automatically](#websockets-do-not-reconnect-automatically)
2. [You have to attach event listeners again](#you-have-to-attach-event-listeners-again)
3. [Messages sent while the connection is down are lost](#messages-sent-while-the-connection-is-down-are-lost)

### WebSockets do not reconnect automatically

A WebSocket connection could go down at anytime due to losing internet connectivity, or if the server handling the WebSocket connection goes down. When this happens, the WebSocket client will close the connection, and it will not reconnect.

It would be great if there was an option to call `websocket.reconnect()` on a closed WebSocket instance - but sadly there isn't, so we have to do it manually with code.

So how do you re-establish the connection?

Well, you have to write code that does the following:

1. Write a function that will create a new WebSocket instance.
2. Attach that as an event listener function on the existing WebSocket's `close` event.
3. Attach that as an event listener function on the new WebSocket instance, inside of the function in step 1.

In short, you have to write a bit of code to handle re-establishing a connection.

### You have to attach event listeners again

When you create new WebSocket instances to re-establish the connection, not only do you need to attach a function to listen on the `close` event, but you also need to re-attach all of the other event listener functions that you had on the existing WebSocket instance (for the `open`, `message`, and `error` events).

And you need to setup the code so that this happens every time a new WebSocket instance is created to replace a closed WebSocket instance.

### Messages sent while the connection is down are lost

If the WebSocket instance's readyState is 3 (meaning closed), if you attempt to send messages via the WebSocket instance, not only are the messages not sent, but they are not kept for sending later.

In short, they are lost.

If you want to prevent that, then you need to keep messages in a list or queue of some kind, and send them only when the WebSocket instance's `readyState` value is 1 (meaning open). 

In short, you have to write code to implement a message queue and use it for dispatching messages depending on the WebSocket's connection status (readyState).

## Introducing Sarus

Sarus is a JavaScript library that improves working with WebSockets as a client. It acts as a wrapper around the native `WebSocket` API, providing additional features such as [automatic reconnections](#automatic-reconnections), [re-attaching event listener bindings](#no-need-to-re-attach-event-listeners), and [message queuing](#message-queuing).

Let's look at how it handles each issue.

### Automatic reconnections

Sarus automatically attempts to reconnect the WebSocket connection if it is lost.

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({ url: 'wss://ws.anephenix.com' });
```

By default, it will wait 1000ms before attempting to reconnect. There are options to configure the `retryConnnectionDelay` value, as well as to setup the reconnection strategy so that it uses exponential backoff, as well as limit the number of attempts to reconnect. 

### No need to re-attach event listeners

When Sarus re-establishes the WebSocket connection, it automatically re-attaches all the event listeners that were bound to the original WebSocket instance. 

Set them up just once and you're good to go.

```javascript
import Sarus from '@anephenix/sarus';

// Event listener functions to bind to the WebSocket
const open = () => console.log('WebSocket connection opened');
const message = (event) => console.log('Server sent a message:', event.data);
const error = (error) => console.error(error);
const close = () => console.log('WebSocket connection closed'); 

const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	eventListeners: {
		open: [open],
		message: [message],
		error: [error],
		close: [close]
	}
});
```

This will also work if you attach the event listener functions using the `on` method:

```javascript
const logMessage = (event) => console.log(event.data);

sarus.on('message', logMessage);
```

### Message queuing

Sarus implements a message queueing system that ensures that messages are sent only if the WebSocket connection is open, saving you from having to write your own message queue as well as linking it to the status of the currently WebSocket instance's `readyState` value. 

So when you call this to send a message:

```javascript
const message = 'Hello world';
sarus.send(message);
```

It will be using the message queue to handle sending the message, and send it only when the WebSocket's connection state is open.

### Message queue persistence

Normally if a page stops running, users will tend to refresh the page, or may close it and open it again later.

In such cases, any messages that were queued up in memory would be lost.

However, Sarus provides a way to persist the message queue using the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). The messages in the queue can be stored in either session storage (for page reloads on the same tab):

```javascript
import Sarus from '@anephenix/sarus';
const sarus = new Sarus({
    url: 'wss://ws.anephenix.com',
    storageType: 'session',
});
```
Or for longer-term persistence (say a page tab gets closed and then opened later on), you can use local storage:

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	storageType: 'local',
});
```

This way, should you wish to guarantee message delivery after a page refresh or closure, you can do so by persisting the message queue.

## Summary

Sarus makes working with WebSockets much better by wrapping the API and implementing useful features like: 

- Automatic reconnections
- Rebinding event listeners on new WebSocket instances
- Using a message queue to provide resilient message delivery
- Persisting the message queue across page reloads

Interested in using Sarus? You can try out the instructions in the [Get started](/guides/get-started/) page.