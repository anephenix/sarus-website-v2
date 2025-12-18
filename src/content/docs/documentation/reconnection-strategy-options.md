---
title: Reconnection strategy options
description: This describes the configuration options for handling reconnections
---

<div class="in-progress">NOTE - page is a work in progress</div>

There are a number of options for handling reconnections in Sarus

## How Sarus handles reconnections

One of the key benefits of Sarus is that it handles reconnecting WebSockets automatically. It does this by:

1. Listening on the `close` event on the WebSocket instance.
2. When that triggers, it will then wait for 1000ms (1 second) before attempting to create a new WebSocket instance.

This is the default behaviour, but you can configure it so that:

- You can adjust the amount of time it waits between reconnections
- You can apply an exponential backoff strategy to give the WebSocket server some space so to speak.
- You can set how many times it will attempt to reconnect.

Here we'll explore the options.

