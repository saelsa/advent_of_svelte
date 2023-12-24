<script>
	import {onMount} from "svelte"
	import '../app.css';
	import Header from '$lib/components/Header.svelte';


	// snowflake definition
	const SNOWFLAKES_COUNT = 100;
	const SNOW_ICONS = ['❆', '❅'];

	    /** Return the configuration for a snowflake 
     * @param {number} i - An integer that the configuration is based on 
    */
	function snowFlakeConfig(i) {
		return {
			character: SNOW_ICONS[i % SNOW_ICONS.length],
			x: Math.random() * 100,
			y: -20 - Math.random() * 100,
			r: 0.1 + Math.random() * 1,
			opacity: Math.random()
		};
	}

	let snowFlakes = new Array(SNOWFLAKES_COUNT)
		.fill()
		.map((_, i) => snowFlakeConfig(i))
		.sort((a, b) => a.r - b.r);


	let links = [
		{ name: 'Home', url: '/' },
		{
			name: 'Quiz',
			url: '/quiz'
		},
		{
			name: 'Jokes',
			url: '/jokes'
		}
	];

	onMount(() => {
		let frame;

		function loop() {
			frame = requestAnimationFrame(loop);

			snowFlakes = snowFlakes.map((flake) => {
				flake.y += 0.7 * flake.r;
				if (flake.y > 120) flake.y = -20;
				return flake;
			});
		}

		loop();

		return () => cancelAnimationFrame(frame);
	});

</script>

<div class="h-screen w-full bg-emerald-300">
	<Header {links} />
	<div class=" h-[calc(100vh-40px)]">
		<slot />
	</div>
	{#each snowFlakes as flake}
	<span
		class="absolute text-4xl text-white select-none"
		style="left: {flake.x}%; top: {flake.y}%; transform: scale({flake.r}); opacity:{flake.opacity}"
		>{flake.character}</span
	>
{/each}
</div>
