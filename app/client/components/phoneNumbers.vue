<template>
	<div class="phoneNumbers">
		<h3>Ważne numery telefonów</h3>
		<div>
			<a href="tel:800 190 590">800 190 590</a>
			<p>Numer infolinii Narodowego Funduszu Zdrowia dotyczącej postępowania w sytuacji podejrzenia zakażenia koronawirusem</p>
		</div>
		<div>
			<a href="tel:22 25 00 115">22 25 00 115</a>
			<p>
				Jeśli miałeś kontakt z osobą chorą lub zakażoną koronawirusem, to bezzwłocznie, telefonicznie powiadom stację sanitarno-epidemiologiczną: dzwoń do
				Centrum kontaktu COVID-19. Infolinia czynna całodobowo
			</p>
		</div>
		<div>
			<a href="tel:22 125 66 00">22 125 66 00</a>
			<p>Jeżeli jesteś za granicą, to dzwoń pod numer infolinii</p>
		</div>
		<h4>
			Twój stan jest ciężki? Nie czekaj. Zadzwoń na numer alarmowy <a href="tel:112">112</a> lub <a href="tel:999">999</a> i uprzedź, że możesz mieć
			koronawirusa.
		</h4>
	</div>
</template>

<script>
	export default {
		name: 'phoneNumbers',
	};
</script>

<style lang="scss" scoped>
	@import '../scss/vars/_colors.scss';
	@import '../scss/mixins/_flex.scss';
	.phoneNumbers {
		margin: 32px 0;
		width: calc(100vw - 24px);
		max-width: 500px;
		padding: 12px;
		@include flex(column, flex-start);

		// max-width: 300px;
		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		h3,
		h4 {
			font-weight: 600;
			color: $richBlack;
		}
		div {
			margin-bottom: 12px;
		}
		a {
			text-decoration: none;
			color: $babyPowder;
			background-color: $littleBoyBlue;
			display: inline-block;
			padding: 0 5px;
			margin: 0;
			line-height: 150%;
		}
	}
	@media (min-width: 768px) {
		.phoneNumbers {
			margin: 64px 0;
			max-width: 600px;
		}
	}
	@media (min-width: 1024px) {
		.phoneNumbers {
			max-width: 800px;
		}
	}
</style>
