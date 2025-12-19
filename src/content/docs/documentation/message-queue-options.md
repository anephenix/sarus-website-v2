---
title: Message queue options
description: This describes the configuration options for the message queu that Sarus uses
---

In order to provide some resilience when it comes to dispatching messages, Sarus uses a message queue to ensure that it will:

- not lose messages in case the WebSocket instance's connection is closed
- it can keep the messages and send once the WebSocket has reconnected

No special configuration is required to handle this - it is in place by default

## Persisting message storage

Sometimes when a user has an issue with a page's connectivity, they will attempt to reload the page in the Web Browser in order to get it to work again.

The knock-on effect of this is that if there are messages pending to be sent from the client to the server, then they could be lost.

In such cases, you may want the message queue to keep those messages even after a page reload so that they can be sent.

To support this, you can configure Sarus to use the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to store the messages.

You have 2 options web storage:

- sessionStorage
- localStorage

### SessionStorage

To use session storage for persisting the message queue, pass this when instantiating Sarus:

```javascript
const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	storageType: 'session',
});
```

### LocalStorage

To use local storage for persisting the message queue, pass this when instantiating Sarus:

```javascript
const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	storageType: 'local',
});
```

### Which one should I use?

This depends on your needs. 

If you want the message queue to persist only in that browser tab, and persist with page reloads, then use sessionStorage.

If you want the message queue to persist even if the browser tab and browser is closed and then opened again later, then use localStorage.