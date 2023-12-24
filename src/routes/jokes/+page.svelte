<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import data from '$lib/data/jokes.js';
	import {shuffle} from '$lib/utils.js'

	let currentJoke = '';
	let jokeIndex = 0;
	let jokes = shuffle(data);

	let buttonPressed = false;
	let synthesis = undefined;
	let voices = [];

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	}

	/**
	 * Read a joke out loud
	 * @param {string} joke - A joke that should be read out loud.
	 */
	function readJoke(joke) {
		if (!voices.length) return;
		let voice = voices[getRandomIntInclusive(0, voices.length - 1)];
		const utterance = new SpeechSynthesisUtterance(joke);

		utterance.voice = voice;
		utterance.pitch = 1.5;
		utterance.rate = 1.25;
		utterance.volume = 0.8;

		synthesis.speak(utterance);
	}

	/**
	 * Show and read a joke
	 */
	function getJoke() {
		buttonPressed = true;
		setTimeout(() => {
			jokeIndex += 1;
			currentJoke = jokes[jokeIndex - 1];
			buttonPressed = false;
			readJoke(currentJoke);
		}, 150);
	}

	onMount(() => {
		// set variables for speech synthesis
		if ('speechSynthesis' in window) {
			synthesis = window.speechSynthesis;
			voices = synthesis.getVoices();
		}
	});
</script>

<section class="h-full overflow-scroll" aria-hidden="true">
	<div class="flex flex-row h-full items-center align-middle md:w-2/5 m-auto">
		<div class="flex flex-col m-auto items-center justify-center bg-white bg-opacity-50 p-10 rounded-lg">
			<h1 class="text-4xl font-extrabold text-center text-emerald-900 p-2 mb-5">
				🎅 Christmas Jokes
			</h1>
			<h2 class="text-sm text-center mb-5 text-emerald-700">
				How does Santa deal with all the stress before the christmas madness? He likes to laugh.
				Laughing relaxes. Ho Ho Ho! Do you also want to laugh a bit?
			</h2>
			<div>
				<button
					on:click={getJoke}
					class="bg-red-100 hover:bg-red-300 text-red-500 font-semibold
                 py-2 px-4 border border-red-500 hover:border-red-500 rounded transition duration-150 ease-in-out"
					class:animate-bounce={buttonPressed}
				>
					I want to hear {jokeIndex ? 'another' : 'a'} joke!
				</button>
			</div>
			<div class="p-10 h-40">
				{#if jokeIndex}
					{#key currentJoke}
						<p
							in:scale={{ delay: 250, duration: 300, easing: quintOut }}
							class="text-2xl text-center text-emerald-900"
						>
							{currentJoke}
						</p>
					{/key}
				{/if}
			</div>
		</div>
	</div>
</section>
