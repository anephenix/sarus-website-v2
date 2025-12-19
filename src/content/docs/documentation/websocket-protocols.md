---
title: WebSocket protocols
description: This document describes the options around setting the WebSocket protocols in use
---

In the [WebSocket spec](https://websocket.org), there are multiple protocols that can be used.

In Sarus, you can pass the protocols that you wish to use when instantiating the Sarus instance:

```javascript
const sarus = new Sarus({
	url: 'wss://ws.anephenix.com',
    protocols: 'hybi-00' // or an array of strings
});
```