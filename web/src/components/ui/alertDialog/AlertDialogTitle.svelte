<script>
	import { AlertDialog } from 'bits-ui';

	let { children } = $props();
</script>

<AlertDialog.Title class="text-lg font-semibold tracking-tight text-white">
	{@render children()}
</AlertDialog.Title>
