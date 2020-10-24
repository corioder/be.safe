export default (arr, props, format) => {
	const propsElements = props.split('.');

	let getFunc = (obj, prop) => {
		let deconstructedObj = obj[prop][propsElements[0]];
		for (let i = 1; i < propsElements.length; i++) {
			deconstructedObj = deconstructedObj[propsElements[i]];
		}

		return deconstructedObj;
	};

	if (format != undefined) {
		const oldGetFunc = getFunc;
		getFunc = (obj, prop) => format(oldGetFunc(obj, prop));
	}

	return new Proxy(arr, {
		get(obj, prop) {
			try {
				if (isNaN(Number(prop))) return obj[prop];
			} catch (err) {
				return obj[prop];
			}
			return getFunc(obj, prop);
		},
	});
};
