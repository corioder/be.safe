// TODO: add more error messages

const errors = {
	'TypeError: Failed to fetch': 'Connection fail, please check your internet connection',
	// 	TypeError
	// mapErrorNames.js:6 Failed to fetch
};

export default (err) => {
	console.log(String(err))

	let errMessage  = errors[String(err)]
	if(errMessage == undefined) {
		return "Unknow error"
	}

	return errMessage
};
