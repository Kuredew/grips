<script>
	import { AlertDialog } from 'bits-ui';

	let { children } = $props();
</script>

<AlertDialog.Content
	class="shadow-popover fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-2 rounded-2xl border-2 border-neutral-800 bg-neutral-900 p-7 outline-hidden data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in sm:max-w-lg md:w-full"
	>{@render children()}</AlertDialog.Content
>
