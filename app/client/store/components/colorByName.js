export default (text) => {
	const colors = {
		richBlack: '#011627',
		babyPowder: '#fdfffc',
		littleBoyBlue: '#72a1e5',
		cinnabar: '#e94f37',
		orange: '#ff850a',
		shamrockGreen: '#329f5b',
	};
	let color;
	switch (text) {
		case 'informed':
		case 'Aktywne przypadki w Polsce':
		case 'Osoby na kwarantannie w Polsce':
		case 'Osoby pod nadzorem epidemiologicznym w Polsce':
			color = colors.orange;
			break;
		case 'aware':
		case 'Potwierdzone przypadki w Polsce':
		case 'Hospitalizowani w Polsce':
			color = colors.cinnabar;
			break;
		case 'preventive':
		case 'Wyzdrowieli w Polsce':
			color = colors.shamrockGreen;
			break;
		case 'Zgony w Polsce':
		case 'Zajęte respiratory w Polsce':
			color = colors.richBlack;
			break;
		default:
			color = colors.littleBoyBlue;
			break;
	}
	return color;
};
