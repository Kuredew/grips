<script>
	import { AlertDialog } from 'bits-ui';

	let { children } = $props();
</script>

<AlertDialog.Description class="text-sm">
	{@render children()}
</AlertDialog.Description>
