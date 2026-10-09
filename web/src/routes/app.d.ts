declare module '*.md' {
	import type { Component } from 'svelte';

	const component: Component;
	export const metadata: Record<string, unknown>;
	export default component;
}
