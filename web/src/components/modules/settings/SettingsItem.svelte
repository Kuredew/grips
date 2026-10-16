<script lang="ts">
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import Switch from '#components/ui/switch/Switch.svelte';
	import { settingsManager } from '#lib/settings.svelte.ts';
	import type { SettingItem } from '#lib/settingsSchema.ts';

	let { settingItem }: { settingItem: SettingItem } = $props();
	let value = $derived(settingsManager.settingsValue.current[settingItem.key]);

	let allowedChange = $derived.by(() => {
		if (settingItem.requiredSettingItem == undefined) return true;

		const requiredSettingItem = settingItem.requiredSettingItem;
		return (
			settingsManager.settingsValue.current[requiredSettingItem.key] == requiredSettingItem.value
		);
	});
</script>

{#snippet label()}
	{#if settingItem.subGroupKey}
		<h4 class="font-medium text-white">{settingItem.label}</h4>
	{:else}
		<h3 class="font-medium text-white">{settingItem.label}</h3>
	{/if}
{/snippet}

<div class="flex w-full flex-col gap-1 {allowedChange ? '' : 'pointer-events-none opacity-70'}">
	{#if settingItem.type == 'select'}
		<!-- label -->
		{@render label()}

		{#if settingItem.selectOptions}
			<div
				class="flex w-full max-w-full scrollbar-none overflow-x-auto rounded-xl bg-neutral-900 p-1"
			>
				{#each settingItem.selectOptions as option (option.key)}
					<ButtonComponent
						onclick={() => {
							settingsManager.settingsValue.current[settingItem.key] = option.value;
						}}
						variant={value == option.value ? 'primary' : 'secondary'}
						class="h-fit w-full rounded-xl border-none py-2 text-sm! {value == option.value
							? 'pointer-events-none'
							: ''}">{option.label}</ButtonComponent
					>
				{/each}
			</div>
		{/if}
	{:else if settingItem.type == 'toggle'}
		<button
			onclick={() => {
				settingsManager.settingsValue.current[settingItem.key] = !value;
			}}
			class="flex h-11 w-full cursor-pointer items-center justify-between rounded-xl bg-neutral-900 px-4 hover:bg-neutral-800"
		>
			{@render label()}
			<Switch active={value ? true : false} />
		</button>
	{/if}

	<div class="text-sm">{settingItem.description}</div>
</div>
