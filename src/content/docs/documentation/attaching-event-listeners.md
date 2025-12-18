---
title: Attaching event listeners
description: This describes how to add and remove event listeners to the WebSocket
---

There are 4 events that a WebSocket instance emits:

- open
- message
- error
- close

Normally you add event listener functions for those events like this:

```javascript
const open = (event) => {
    console.log('WebSocket opened');
}

const message = (event) => {
    console.log('WebSocket server sent', event.data);
}

const error = (event) => {
    console.log('WebSocket error');
}

const close = (event) => {
    console.log('WebSocket closed');
}

socket.onopen = open;
socket.onmessage = message;
socket.onerror = error;
socket.onclose = close;
```

However, these event listener bindings will only apply to that WebSocket instance, and become irrelevant if the WebSocket instance loses its connection.

## How Sarus handles event listeners

Using plain WebSockets, any time that you need to create a new WebSocket instance to reconnect, you also need to reattach all of your event listeners. 

Sarus handles this for you automatically, so that when a reconnection occurs, all of your event listeners are reattached without you needing to do anything.

## What events can you listen on?

When you create a WebSocket instance, there are 4 events that you can listen on:

<table>
<thead>
    <th>
        Event name
    </th>
    <th>
      What it does
    </th>
</thead>
<tbody>
    <tr>
        <td>open</td>
        <td>Triggers when the connection is established</td>
    </tr>
    <tr>
        <td>message</td>
        <td>Triggers when a message is received from the server</td>
    </tr>
    <tr>
        <td>error</td>
        <td>Triggers when an error occurs</td>
    </tr>
    <tr>
        <td>close</td>
        <td>Triggers when the connection is closed</td>
    </tr>
</tbody>
</table>

You can attach event listeners to these events in two different ways - either when instantiating the Sarus object, or afterwards.

## Attaching event listeners when instantiating Sarus

Here's an example when you can attach event listener functions for all 4 events when creating the Sarus instance:

```javascript
import Sarus from '@anephenix/sarus';

// Define the event listener functions here

const open = (event) => {
  console.log('Connection opened:', event);
};

const message = (event) => {
    console.log('Message received:', event.data);
};

const error = (event) => {
    console.error('Error occurred:', event);
};

const close = (event) => {
    console.log('Connection closed:', event);
};

// And then pass them to the Sarus constructor like this:
const sarus = new Sarus({
  url: 'wss://ws.anephenix.com',
  	eventListeners: {
		open: [open],
		message: [message],
		close: [close],
		error: [error],
	},
});
```

Or alternatively, if you only want to attach an event listener for a single event (such as when a message is received), then you can do it like this:

```javascript
const sarus = new Sarus({
  url: 'wss://ws.anephenix.com',
  	eventListeners: {
        message: [message],
    },
});
```

## Attaching event listeners after instantiating Sarus

You can also attach event listeners after you have created the Sarus instance, using the `on` method. Here's an example:

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({ url: 'wss://ws.anephenix.com' });

sarus.on('open', (event) => {
  console.log('Connection opened:', event);
});

sarus.on('message', (event) => {
    console.log('Message received:', event.data);
});

sarus.on('error', (event) => {
    console.error('Error occurred:', event);
});

sarus.on('close', (event) => {
    console.log('Connection closed:', event);
});
```

## Detaching event listeners

You can detach event listeners using the `off` method. Here's an example of how to remove an event listener:

```javascript
function messageListener(event) {
    console.log('Message received:', event.data);
};

// Attaching the event listener
sarus.on('message', messageListener);

// Later on, we can remove the event listener
sarus.off('message', messageListener);
```

You can also pass the name of the function as well
```javascript
sarus.off('message', 'messageListener');
```