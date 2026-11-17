<script>
	import { AlertDialog } from 'bits-ui';

	let { children } = $props();
</script>

<AlertDialog.Portal>{@render children()}</AlertDialog.Portal>
