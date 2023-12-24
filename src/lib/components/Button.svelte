<script>
	export let text;
	export let color;
	export let onClick;
	export let additionalClasses = '';
	export let disabled;
	export let animateBounce;
</script>

<button
	class="bg-{color}-300 hover:bg-{color}-500 
           text-{color}-500 hover:text-{color}-700 font-semibold
           py-2 px-4 
           border border-{color}-500 hover:border-{color}-500 rounded 
           transition duration-150 ease-in-out {additionalClasses}"
	on:click={onClick}
	{disabled}
	class:animate-bounce={animateBounce}
>
	{text}
</button>
