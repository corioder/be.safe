<template>
	<div class="aware">
		<select @change="$refs.intCharts.changeChart($event.target.value)">
			<option value="">Please select one</option>
			<option v-for="(country, code) in countries" :key="`${code}_chart`" :value="code">{{ country }}</option>
		</select>
		<internationalBarCharts />
		<internationalAreaCharts ref="intCharts" />
	</div>
</template>

<script>
	import internationalAreaCharts from '@/components/charts/internationalAreaCharts.vue';
	import internationalBarCharts from '@/components/charts/internationalBarCharts.vue';
	import countries from '@/assets/data/countries.json';

	export default {
		name: 'aware',
		components: {
			internationalAreaCharts,
			internationalBarCharts,
		},
		data() {
			return {
				input: '',
				countries: countries,
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	/* .aware {
			@include flex(column);
			select {
				width: calc(100vw - 24px);
				box-shadow: none;
				border: none;
				background: none;
				appearance: none;
				background-color: $babyPowder;
				color: $richBlack;
				font-size: 14px;
			}

			// select::-ms-expand {
			// 	display: none;
			// }
		} */
	/* class applies to select element itself, not a wrapper element */
	select {
		display: block;
		font-size: 16px;
		font-family: sans-serif;
		font-weight: 700;
		color: $richBlack;
		line-height: 1.3;
		padding: 6px;
		width: calc(100vw - 24px);
		box-sizing: border-box;
		margin: 0;
		// border: 1px solid #aaa;
		border: none;
		// box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
		border-radius: 10px;
		appearance: none;
		background-color: $babyPowder;
		/* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
	        for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference
	        
	    */
		background-image: url('../assets/icons/dropdown.svg');
		background-repeat: no-repeat, repeat;
		/* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
		background-position: right 0.7em top 50%, 0 0;
		/* icon size, then gradient */
		background-size: auto, 100%;
	}
	/* Hide arrow icon in IE browsers */
	select::-ms-expand {
		display: none;
	}
	/* Hover style */
	select:hover {
		border-color: #888;
	}
	/* Focus style */
	select:focus {
		border-color: #aaa;
		/* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
		box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
		box-shadow: 0 0 0 3px -moz-mac-focusring;
		color: #222;
		outline: none;
	}

	/* Set options to normal weight */
	select option {
		font-weight: normal;
	}

	/* Support for rtl text, explicit support for Arabic and Hebrew */
	*[dir='rtl'] select,
	:root:lang(ar) select,
	:root:lang(iw) select {
		background-position: left 0.7em top 50%, 0 0;
		padding: 0.6em 0.8em 0.5em 1.4em;
	}

	/* Disabled styles */
	select:disabled,
	select[aria-disabled='true'] {
		background-image: url('../assets/icons/dropdown.svg');
	}

	select:disabled:hover,
	select[aria-disabled='true'] {
		border-color: #aaa;
	}
</style>
