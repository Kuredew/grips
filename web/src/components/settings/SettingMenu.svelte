<script lang="ts">
	import VideoIcon from '../logo/VideoIcon.svelte';
	import GroupItem from './GroupItem.svelte';
</script>

<div id="setting-menu">
	<div id="setting-group">
		<GroupItem icon={VideoIcon} key="media" />
	</div>
</div>

<style>
	#setting-menu {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	#setting-group {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 10px;
		border: 2px;
		border-color: var(color-neutral-400);
		background-color: var(--color-neutral-900);
		overflow: hidden;
	}
</style>
