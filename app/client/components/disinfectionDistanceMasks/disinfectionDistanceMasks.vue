<template>
	<div class="disinfectionDistanceMasks">
		<h4>Zasady</h4>
		<div class="container">
			<div class="photo disinfection" alt="" />
			<div class="text">
				<h6>Dezynfekcja</h6>
			</div>
		</div>
		<div class="container">
			<div class="photo distance" alt="" />
			<div class="text">
				<h6>Dystans</h6>
			</div>
		</div>
		<div class="container">
			<div class="photo masks" alt="" />
			<div class="text">
				<h6>Maseczki</h6>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'disinfectionDistanceMasks',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.disinfectionDistanceMasks {
		margin: 32px 0;
		width: calc(100vw - 24px);
		max-width: 500px;
		padding: 12px;
		@include flex(column, flex-start);

		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		h4 {
			font-size: 16px;
			font-weight: 600;
			background-color: $shamrockGreen;
			color: $babyPowder;
			padding: 3px 10px;
		}
		.container {
			@include flex;
			margin-bottom: 32px;
			.photo {
				width: 100px;
				height: 100px;
				border-radius: 10px;
				margin-right: 12px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}
			h6 {
				margin: 0;
				font-size: 16px;
				font-weight: 400;
			}
		}
		.disinfection {
			background-image: url('~@/assets/images/disinfection.jpg');
		}
		.distance {
			background-image: url('~@/assets/images/distance.jpg');
		}
		.masks {
			background-image: url('~@/assets/images/masks.jpg');
		}
	}
	@media (min-width: 768px) {
		.disinfectionDistanceMasks {
			margin: 64px 0;
			max-width: 600px;
		}
	}
	@media (min-width: 1024px) {
		.disinfectionDistanceMasks {
			max-width: 800px;
		}
	}
</style>
