<template>
	<div class="boxes">
		<div class="homeBoxes" v-if="isHome">
			<box v-for="category in $store.getters.getCategoriesForHome" :key="`${category.name}boxHome`" :data="category" />
			<boxButton @click.native="$router.push('/informed')" />
		</div>
		<div class="informedBoxes" v-else-if="isForToday">
			<box v-for="category in $store.state.categories" :key="`${category.name}boxHome`" :data="category" />
		</div>
		<div class="container" v-else>
			<label for="date">Dane z dnia</label>
			<input name="date" type="date" v-model="date" @change="getData()" min="2020-03-05" :max="today" pattern="\d{4}-\d{2}-\d{2}" />
			<p>{{ message }}</p>
			<div class="notTodaysBoxes">
				<box v-for="category in dateData" :key="`${category.name}boxHome`" :data="category" />
			</div>
		</div>
	</div>
</template>

<script>
	import box from './box.vue';
	import boxButton from './boxButton.vue';

	export default {
		name: 'boxes',

		components: {
			box,
			boxButton,
		},
		data() {
			return {
				isHome: undefined,
				date: '',
				dateData: [],
				message: '',
			};
		},
		created() {
			if (this.$route.name == 'informed') this.isHome = false;
			else this.isHome = true;
		},
		methods: {
			getData() {
				this.dateData = this.$store.getters.getDataForDate(this.date);
				const date = new Date(this.date);
				if (date.getFullYear() == 2020 && (date.getMonth() + 1 < 4 || (date.getMonth() + 1 == 4 && date.getDate() < 29)))
					this.message = 'Niestety nie posiadamy danych o przetestowanych osobach sprzed 28.04.2020';
				else this.message = '';
			},
		},
		computed: {
			today() {
				const date = new Date();
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			},
		},
		props: {
			isForToday: {
				type: Boolean,
				required: false,
				default: true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/mixins/_grid.scss';
	@import '@/scss/vars/_colors.scss';
	.boxes,
	.container {
		max-width: calc(100vw - 24px);
		@include flex(column);
		.homeBoxes,
		.informedBoxes,
		.notTodaysBoxes {
			@include grid(1);
			grid-gap: 32px;
		}
		.homeBoxes {
			margin: 64px 0 0 0;
		}
		.informedBoxes,
		.notTodaysBoxes {
			margin: 32px 0 64px 0;
		}
	}
	.container {
		margin-top: 64px;
		input {
			width: 400px;
			margin-bottom: 32px;
			padding: 10px;
			background-color: $babyPowder;
			border: none;
			border-radius: 10px;
			font-size: 16px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
			transform: scale(1);
			transition: transform 0.2s ease-in-out;
		}
		input:focus {
			outline: none;
			transform: scale(1.01);
		}
	}

	@media (min-width: 768px) {
		.boxes {
			.informedBoxes,
			.homeBoxes,
			.notTodaysBoxes {
				grid-template-columns: repeat(2, 1fr);
				grid-gap: 64px;
			}
		}
	}

	@media (min-width: 1048px) {
		.boxes {
			.informedBoxes,
			.homeBoxes,
			.notTodaysBoxes {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>
