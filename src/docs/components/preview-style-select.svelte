<script lang="ts">
	import { createSelect, melt, type SelectOptionProps } from '$lib/index.js';
	import { Check, ChevronDown } from 'lucide-svelte';
	import type { Writable } from 'svelte/store';

	export let options: SelectOptionProps<'tailwind' | 'css'>[] = [];
	export let codingStyle: Writable<'tailwind' | 'css'>;

	const {
		elements: { trigger, menu, option },
		states: { valueLabel },
		helpers: { isSelected },
	} = createSelect({ value: codingStyle });
</script>

<button
	class="flex w-[140px] items-center justify-between rounded-md border border-magnum-700 bg-neutral-800 px-3 py-1
  text-magnum-600 outline-none transition-opacity hover:opacity-75 focus:!border-magnum-400 focus:!text-magnum-400"
	use:melt={$trigger}
	aria-label="Select"
>
	{$valueLabel === 'tailwind' ? 'Tailwind' : 'CSS'}
	<ChevronDown class="square-4" />
</button>

<ul
	class="0 z-10 flex max-h-[360px] flex-col
  overflow-y-auto rounded-md bg-neutral-800 p-1 shadow-md focus:!ring-0"
	use:melt={$menu}
>
	{#each options as o}
		<li
			class="relative cursor-pointer rounded-md py-1 pl-8 pr-4 text-neutral-400 outline-none focus:!text-magnum-400
			data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[selected]:text-magnum-600
			data-[disabled]:line-through"
			use:melt={$option({ ...o })}
		>
			{#if $isSelected(o.value)}
				<div class="check">
					<Check class="square-4" />
				</div>
			{/if}

			{#if o.label === 'css'}
				CSS
			{:else if o.label === 'tailwind'}
				Tailwind
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	.check {
		@apply absolute left-2 top-1/2;
		translate: 0 calc(-50% + 1px);
	}
</style>
