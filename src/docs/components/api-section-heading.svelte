<script lang="ts">
	import { h3 as H3 } from '$docs/components/markdown/index.js';
	import { createHeadingId } from '$docs/utils/index.js';
	import { Hammer, Shapes } from 'lucide-svelte';
	import P from './markdown/p.svelte';
	export let title: string;
	export let description: string;
	export let isBuilder = false;
</script>

<div
	class="absolute -left-[1px] -top-[1px] flex items-center justify-between gap-1.5 rounded-br-md rounded-tl-md border border-magnum-600 bg-magnum-600/25 px-3 py-1.5"
>
	<H3 class="mb-0 mt-0" id={createHeadingId(title)}>{title}</H3>
</div>
{#if isBuilder}
	<Hammer class="absolute right-4 top-4 text-white square-4" />
{:else}
	<Shapes class="absolute right-4 top-4 text-white square-4" />
{/if}
<P class="mb-6">
	{@html description}
</P>
