<script lang="ts">
	import { createSwitch, melt } from '$lib/index.js';

	const {
		elements: { root, input },
		states: { checked },
	} = createSwitch();
</script>

<form>
	<div class="flex items-center">
		<label
			class="pr-4 leading-none text-magnum-900"
			for="airplane-mode"
			id="airplane-mode-label"
		>
			Airplane mode
		</label>
		<button
			use:melt={$root}
			class="relative h-6 w-11 cursor-default rounded-full bg-magnum-800 transition-colors data-[state=checked]:bg-magnum-950"
			id="airplane-mode"
			aria-labelledby="airplane-mode-label"
		>
			<span
				class="block h-5 w-5 translate-x-0.5 rounded-full bg-white
                transition-transform will-change-transform
                {$checked && 'translate-x-[22px]'}"
			/>
		</button>
		<input use:melt={$input} />
	</div>
</form>
