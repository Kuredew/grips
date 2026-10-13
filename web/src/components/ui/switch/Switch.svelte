<script lang="ts">
	import { Switch } from 'bits-ui';

	let { active }: { active: boolean } = $props();
</script>

<Switch.Root
	class="min-h-4 max-w-11 min-w-11 cursor-pointer rounded-full bg-neutral-700 p-1 data-[state=checked]:bg-neutral-500"
	checked={active}
>
	<Switch.Thumb
		class="block size-4! rounded-full bg-white transition-transform data-[state=checked]:translate-x-5"
	></Switch.Thumb>
</Switch.Root>
