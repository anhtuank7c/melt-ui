<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';
	import { fade, fly } from 'svelte/transition';
	import { Menu, X } from 'lucide-svelte';
	import { Button, Logo, MobileNavLink } from '$docs/components/index.js';
	import { navConfig } from '$docs/config.js';
	import Switch from '../switch.svelte';
	import { getUsingPreprocessor } from '$routes/store.js';
	import { writable } from 'svelte/store';

	const open = writable(false);
	const {
		elements: { trigger, overlay, content, close, portalled },
	} = createDialog({
		open,
	});

	const usingPreprocessor = getUsingPreprocessor();
</script>

<button
	use:melt={$trigger}
	class="ml-6 text-neutral-400 transition-colors hover:text-neutral-50 md:hidden"
>
	<Menu class="square-6" />
	<span class="sr-only">Toggle Menu</span>
</button>
<div use:melt={$portalled} class="md:hidden">
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="menu safe-area fixed bottom-0 z-50 h-2/3 w-full bg-neutral-900 px-2
				 pt-6 shadow-lg focus:outline-none"
			transition:fly={{ y: 768, duration: 300, opacity: 1 }}
		>
			<div class="flex items-center justify-between">
				<MobileNavLink href="/" {open}>
					<Logo class="h-9" withText textColor="white" />
				</MobileNavLink>
				<Button class="px-2" size="sm" variant="faded" {...$close} action={$close.action}>
					<X class="square-4" />
				</Button>
			</div>

			<div class="mt-2 flex justify-center rounded-lg bg-neutral-800 px-4 py-2">
				<Switch id="preprocessor" bind:checked={$usingPreprocessor} keepState>
					<a href="/docs/preprocessor" class="underline"> Preprocessor </a>
				</Switch>
			</div>

			<div class="mb-4 mt-1 h-full overflow-auto overflow-x-visible py-2 pr-4">
				<div class="flex flex-col">
					{#each navConfig.mainNav as navItem, index (navItem + index.toString())}
						{#if navItem.href}
							<MobileNavLink href={navItem.href} {open}>
								{navItem.title}
							</MobileNavLink>
						{/if}
					{/each}
				</div>
				<div class="flex flex-col space-y-2">
					{#each navConfig.sidebarNav as navItem, index (index)}
						<div class="flex flex-col pt-6">
							<span
								class="rounded-md px-3 pb-2 text-sm font-semibold uppercase tracking-wider text-neutral-400"
								>{navItem.title}</span
							>
							{#if navItem?.items?.length}
								{#each navItem.items as item}
									{#if !item.disabled && item.href}
										<MobileNavLink href={item.href} {open}>
											{item.title}</MobileNavLink
										>
									{/if}
								{/each}
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.menu,
	.menu :global(*) {
		@apply !ring-0;
	}

	.safe-area {
		padding-bottom: calc(6.5rem + env(safe-area-inset-bottom));
	}
</style>
