<template>
	<div class="boxes">
		<div class="homeBoxes" v-if="isHome">
			<box v-for="category in $store.getters.getCategoriesForHome" :key="`${category.name}boxHome`" :data="category" />
			<boxButton @click.native="$router.push('/informed')" />
		</div>
		<div class="informedBoxes" v-else>
			<box v-for="category in $store.state.categories" :key="`${category.name}boxHome`" :data="category" />
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
			};
		},
		created() {
			if (this.$route.name == 'informed') this.isHome = false;
			else this.isHome = true;
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/mixins/_grid.scss';
	.boxes {
		max-width: calc(100vw - 24px);
		@include flex(column);
		.homeBoxes,
		.informedBoxes {
			@include grid(1);
			grid-gap: 32px;
		}
		.homeBoxes {
			margin: 64px 0 0 0;
		}
		.informedBoxes {
			margin: 32px 0 64px 0;
		}
	}

	@media (min-width: 768px) {
		.boxes {
			.informedBoxes,
			.homeBoxes {
				grid-template-columns: repeat(2, 1fr);
				grid-gap: 64px;
			}
		}
	}

	@media (min-width: 1048px) {
		.boxes {
			.informedBoxes,
			.homeBoxes {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>
