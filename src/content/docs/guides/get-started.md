---
title: Get started
description: A guide to getting Sarus installed and running in your application.
---

This is a quick guide to getting Sarus installed and running in your application.

## Installation

You can install Sarus via npm:

```shell
npm i @anephenix/sarus
```

## Setup

Once you have it installed, you can load it in your web application like this:

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({ url: 'wss://ws.anephenix.com' });
```

This will create an instance of Sarus and open a WebSocket connection to `wss://ws.anephenix.com`.

## Listening for messages

To listen for messages being sent from the server to the client, we can attach an event listener function like this:

```javascript
const logMessage = (event) => console.log(event.data);

sarus.on('message', logMessage);
```

## Sending messages

You can send text-based messages to the server like this:

```javascript
sarus.send('Hello world');
```

## Review

At this point we have:

1. Installed Sarus
2. Setup an instance in the code
3. Setup a way to receive and react to messages sent from the server
4. Seen how to send messages to the server

For most people this covers their needs, and gives them the benefit of not having to write code to handle:

- Reconnecting WebSockets when they close
- Attaching event listener functions to new WebSocket instances that are created when existing WebSocket instances close
- Message delivery if a WebSocket connection unexpectedly closes

As Sarus handles that for them out of the box.

## Next steps

For more information on other features of Sarus, check out the [documentation](/reference/documentation) to learn more.