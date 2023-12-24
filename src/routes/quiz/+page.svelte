<script>
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';

	import data from '$lib/data/questions.js';
	import { shuffle } from '$lib/utils.js';
	import Button from '$lib/components/Button.svelte';

	let box;
	let height = 0;
	let width = 30;
	const margin = { top: 20, bottom: 0, left: 0, right: 20 };

	let numQuestions = data.length;
	let activeQuestionIndex = 0;
	let submitted;

	let points = 0;

	$: activeQuestion = data[activeQuestionIndex];
	$: possibleAnswers = shuffle(activeQuestion.answers);
	$: correctAnswer = activeQuestion.answers.find((answer) => answer.correct).text;
	$: yScale = scaleLinear()
		.domain([0, numQuestions])
		.range([margin.bottom, height - margin.top - margin.bottom]);

	function confirmAnswer(answer) {
		submitted = true;
		if (answer === correctAnswer) {
			points += 1;
		}
		setTimeout(() => {
			nextQuestion();
		}, 1750);
	}

	function nextQuestion() {
		submitted = false;
		activeQuestionIndex += 1;

		if (activeQuestionIndex === numQuestions) {
			alert(`Congrats! You have gained ${points} points`);
			return;
		}
	}

	onMount(() => {
		height = box.clientHeight;
	});
</script>

<section class="h-full overflow-scroll" aria-hidden="true">
	<div class="flex flex-row h-full items-center align-middle md:w-2/5 m-auto">
		<!-- Card -->
		<div class="flex flex-row m-auto bg-white bg-opacity-50 p-10 rounded-lg">
			<div class="flex grow flex-col m-auto items-center justify-center" bind:this={box}>
				<h1 class="text-4xl font-extrabold text-center text-emerald-900 p-2 mb-5">
					☃️ Christmas Quiz
				</h1>
				<h2 class="text-sm text-center mb-5 text-emerald-700">
					<p>Question {activeQuestionIndex + 1} from {numQuestions}</p>
					<progress max={numQuestions} value={activeQuestionIndex} />
				</h2>
				<!-- Questions -->
				<div class="flex flex-col items-baseline m-auto">
					<p class="font-bold mt-0 break-words">
						{activeQuestion.question}
					</p>

					<div class="grid grid-rows-2 gap-2 grid-flow-row w-full">
						{#each possibleAnswers as answer (answer.text)}
							{#if submitted}
								{#if answer.correct}
									<button
										class="bg-emerald-300 hover:bg-emerald-500 text-emerald-500 hover:text-emerald-700 font-semibold
                                                py-2 px-4
                                                border border-emerald-500 hover:border-emerald-500 rounded
                                                transition duration-150 ease-in-out animate-bounce"
										disabled
									>
										{answer.text}
									</button>
								{:else}
									<button
										class="bg-red-300 hover:bg-red-500 text-red-500 hover:text-red-700 font-semibold
                                                py-2 px-4
                                                border border-red-500 hover:border-red-500 rounded
                                                transition duration-150 ease-in-out"
										disabled
									>
										{answer.text}
									</button>
								{/if}
							{:else}
								<button
									class="bg-zinc-300 hover:bg-zinc-500 text-zinc-500 hover:text-zinc-700 font-semibold
                                    py-2 px-4
                                    border border-zinc-500 hover:border-zino-500 rounded
                                    transition duration-50 ease-in-out"
									on:click={() => confirmAnswer(answer.text)}
								>
									{answer.text}
								</button>
							{/if}
						{/each}
					</div>
				</div>
			</div>
			<!-- Success Indicator -->
			<div class="flex items-end">
				<svg width={margin.left + margin.right + width} {height}>
					<rect
						class="rotate-180 origin-center transition-all duration-50"
						x={margin.left}
						y={margin.bottom}
						{width}
						height={yScale(20)}
						rx="5"
						ry="5"
						fill="lightgray"
					/>
					<rect
						class="rotate-180 origin-center transition-all duration-50"
						x={margin.left}
						y={margin.bottom}
						width={points ? width : 0}
						height={yScale(points)}
						rx="5"
						ry="5"
						fill="#f7bd04"
					/>
				</svg>
			</div>
		</div>
	</div>
</section>
