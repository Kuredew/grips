<script lang="ts">
	import { subGroupSchema, type SettingItem } from '#lib/settingsSchema.ts';
	import SettingsItem from './SettingsItem.svelte';

	let { settings }: { settings: SettingItem[] } = $props();

	let subGroupKeys = $derived.by(() => [
		...new Set(
			settings
				.map((m) => {
					return m.subGroupKey;
				})
				.filter((m) => m != undefined)
		)
	]);

	let subGroupLabels = $derived.by(() => {
		const label: Record<string, string> = {};

		subGroupKeys.forEach((key) => {
			const schema = subGroupSchema.filter((m) => m.key == key).pop();
			console.log(schema);
			if (!schema) return;
			label[key] = schema.label;
		});

		return label;
	});

	$effect(() => {
		console.log(subGroupKeys);
		console.log(subGroupLabels);
	});
</script>

{#if settings.length > 0}
	{#each subGroupKeys as subGroupKey (subGroupKey)}
		<div class="flex w-full flex-col gap-2">
			<p class="font-medium text-white">{subGroupLabels[subGroupKey]}</p>
			<div class="flex w-full flex-col gap-4 px-1">
				{#each settings as setting (setting.key)}
					{#if setting.subGroupKey && setting.subGroupKey == subGroupKey}
						<SettingsItem settingItem={setting} />
					{/if}
				{/each}
			</div>
		</div>
	{/each}

	{#each settings as setting (setting.key)}
		{#if !setting.subGroupKey}
			<SettingsItem settingItem={setting} />
		{/if}
	{/each}
{:else}
	<p class="text-center">settings for this have not been added yet.</p>
{/if}
