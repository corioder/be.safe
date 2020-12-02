<template>
	<div class="faq">
		<h1>FAQ</h1>
		<div class="question" v-for="(question, i) in questions" :key="`question_${i}`">
			<p class="q">{{ question.question }}</p>
			<p class="a" v-html="question.answer"></p>
		</div>
		<div class="newQuestion">
			<p class="q">Masz inne pytanie?</p>
			<p class="a"><a href="mailto:be.safe.netlify.app@gmail.com">Napisz do nas!</a></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'faq',
		data() {
			return {
				questions: [
					{
						question: 'Skąd bierzecie dane?',
						answer:
							'Danych z Polski użyczył nam <a href="https://www.linkedin.com/in/maciej-gornicki/" >Maciej Górnicki</a>, a do danych międzynarodowych używamy ogólnodostępnego <a href="https://covid19.richdataservices.com">API</a>',
					},

					{
						question: 'Jak liczone są aktywne przypadki?',
						answer: 'Aktywne przypadki to różnica między zakażonymi a wyzdrowiałymi i zmarłymi, liczona jako ogólna pula.',
					},
					{
						question: 'Skąd bierzecie ikonki na stronę?',
						answer: '<a href="https://tilda.cc">Ikonki</a>',
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/mixins/_a.scss';
	.faq {
		width: 100vw;
		margin: 0;
		padding: 0;
		@include flex(column);
		h1 {
			font-weight: 600;
			padding: 3px 10px;
		}
		.question,
		.newQuestion {
			margin: 0;
			margin-top: 32px;
			width: calc(100vw - 24px);
			max-width: 500px;
			@include flex(column, flex-start);
			line-height: 200%;
			.q {
				font-weight: 600;
				font-size: 1.2em;
				margin-bottom: 0;
			}
		}
		.newQuestion {
			a {
				@include a;
			}
		}
	}
	@media (min-width: 768px) {
		.question,
		.newQuestion {
			margin-top: 64px;
			max-width: 600px;
		}
	}
	@media (min-width: 1024px) {
		.question,
		.newQuestion {
			max-width: 800px;
		}
	}
</style>
<style lang="scss">
	@import '@/scss/mixins/_a.scss';
	.a {
		a {
			@include a;
		}
	}
</style>
