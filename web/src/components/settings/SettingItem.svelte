<script lang="ts">
	import { settings } from '$lib/settings.svelte';
	import type { AppSetting } from '$lib/types/types';
	import RadioButton from '../radio/RadioButton.svelte';
	import RadioWrapper from '../radio/RadioWrapper.svelte';
	import Switch from '../switch/Switch.svelte';

	let { setting }: { setting: AppSetting } = $props();

	let value = $derived(settings.data[setting.key]);
</script>

<div id="setting-item">
	{#if setting.type == 'checkbox'}
		<button
			onclick={() => {
				settings.data[setting.key] = value == 'true' ? 'false' : 'true';
			}}
			class="setting-toggle"
		>
			<p>{setting.label}</p>
			<Switch active={value == 'true'} />
		</button>
	{:else if setting.type == 'select'}
		<p class="setting-label">{setting.label}</p>
		<RadioWrapper>
			{#each setting.options as option (option.value)}
				<RadioButton
					onclick={() => (settings.data[setting.key] = option.value)}
					active={value == option.value}>{option.label}</RadioButton
				>
			{/each}
		</RadioWrapper>
	{/if}
	<div class="setting-description">{setting.description}</div>
</div>

<style>
	#setting-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.setting-label {
		font-weight: 500;
	}

	.setting-description {
		color: var(--color-neutral-400);
		font-size: 14px;
	}

	.setting-toggle {
		padding-inline: 18px;
		padding-block: 12px;
		display: flex;
		justify-content: space-between;
		background-color: var(--color-neutral-900);
		border-radius: 14px;
		transition: 0.1s all ease;
	}

	.setting-toggle:hover {
		cursor: pointer;
		background-color: var(--color-neutral-800);
	}

	.setting-toggle:active {
		background-color: var(--color-neutral-700);
	}
</style>
