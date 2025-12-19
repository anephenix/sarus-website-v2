---
title: Reconnection strategy options
description: This describes the configuration options for handling reconnections
---

There are a number of options for handling reconnections in Sarus:

- Use the default configuration
- Adjust the `retryConnectionDelay` time period between reconnect attempts
- Disabling the `reconnectAutomatically` option
- Configure exponential backoff for the time period between reconnect attempts

## Use the default configuration

One of the key benefits of Sarus is that it handles reconnecting WebSockets automatically. It does this by:

1. Listening on the `close` event on the WebSocket instance.
2. When that triggers, it will then wait for 1000ms (1 second) before attempting to create a new WebSocket instance.

It will keep doing this until it reconnects. 

If this suits your needs, then you don't need to do anything else.

## Adjust the `retryConnectionDelay` time period between reconnect attempts

If you want to adjust the time period between reconnection attempts, you can do that by passing the `retryConnectionDelay` parameter when instantiating the Sarus instance:

```javascript
const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	retryConnectionDelay: 500, // 500ms
});
```

## Disabling the `reconnectAutomatically` option

If you don't want Sarus to attempt to reconnect automatically, there is an option to disable that:

```javascript
const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
	reconnectAutomatically: false,  // Pass this flag to disable it
});
```

## Configure exponential backoff for the time period between reconnect attempts

If you wish to apply some kind of exponential backoff between reconnection attempts, then there is a way to do that.

You can set this by passing the `exponentialBackoff` property like this:

```javascript
import Sarus from '@anephenix/sarus';

const sarus = new Sarus({
    url: 'wss://ws.anephenix.com',
    exponentialBackoff: {
        // Exponential factor, here 2 will result in
        // 1 s, 2 s, 4 s, and so on increasing delays
        backoffRate: 2,
        // Never wait more than 2000 seconds
        backoffLimit: 2000,
    },
});
```