<script lang="ts">
	import { cn } from '$docs/utils';
	import { createPopover, melt } from '$lib/index.js';
	import { Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createPopover({
		positioning: {
			placement: 'top',
			gutter: 8,
		},
		forceVisible: true,
		defaultOpen: true,
		closeOnOutsideClick: false,
		closeOnEscape: false,
		disableFocusTrap: true,
	});

	let className = '';
	export { className as class };

	export let contentClass = '';

	onMount(() => {
		open.set(true);
	});
</script>

<button
	type="button"
	class={cn(
		'inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-medium text-magnum-800',
		'transition hover:opacity-75',
		className
	)}
	use:melt={$trigger}
	aria-label="Add"
>
	<Plus class="square-4" aria-label="plus" />
</button>

{#if $open}
	<div
		use:melt={$content}
		transition:fly={{ duration: 250, y: 4 }}
		class={cn('z-10 rounded-xl bg-white px-4 py-2 shadow-sm', contentClass)}
	>
		<div use:melt={$arrow} />
		<p class=" text-neutral-900">Add item to library</p>
	</div>
{/if}
