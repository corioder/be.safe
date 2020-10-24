<template>
	<div class="aware">
		<select @change="$refs.intCharts.changeChart($event.target.value)">
			<option value="">Please select one</option>
			<option v-for="(country, code) in countries" :key="`${code}_chart`" :value="code">{{ country }}</option>
		</select>
		<internationalCharts ref="intCharts" />
	</div>
</template>

<script>
	import internationalCharts from '@/components/charts/internationalCharts.vue';
	import countries from '@/assets/data/countries.json';
	export default {
		name: 'aware',
		components: {
			internationalCharts,
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
		color: graytext;
		background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
			linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
	}

	select:disabled:hover,
	select[aria-disabled='true'] {
		border-color: #aaa;
	}
</style>
