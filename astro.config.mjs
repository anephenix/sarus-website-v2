// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Sarus',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/anephenix/sarus' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Why use Sarus?', slug: 'guides/why-use-sarus' },
						{ label: 'Get started', slug: 'guides/get-started' },
					],
				},
				{
					label: 'Documentation',
					items: [
						{ label: 'Introduction', slug: 'documentation' },
						{ label: 'Installation', slug: 'documentation/installation' },
						{ label: 'Setup', slug: 'documentation/setup' },
						{ label: 'Attaching Event Listeners', slug: 'documentation/attaching-event-listeners' },
						{ label: 'Reconnection strategy options', slug: 'documentation/reconnection-strategy-options' },
						{ label: 'Receiving messages', slug: 'documentation/receiving-messages' },
						{ label: 'Sending messages', slug: 'documentation/sending-messages' },
						{ label: 'Disconnecting', slug: 'documentation/disconnecting' },
						{ label: 'Message queue options', slug: 'documentation/message-queue-options' },
						{ label: 'WebSocket protocols', slug: 'documentation/websocket-protocols' },
					]
				},
				{
					label: 'Other items',
					autogenerate: { directory: 'other-items' },
				},
			],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
	      ],
		}),
	],
});
