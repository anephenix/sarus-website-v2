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
						{ label: 'FAQs', slug: 'guides/faqs' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
	      ],
		}),
	],
});
