export default (promises, cb) => {
	return new Promise((resolve) => {
		const resoults = [];

		let resolved = 0;
		const tryResolve = (err) => {
			resolved++;
			if (resolved == promises.length) resolve(resoults);
		};

		for (let i = 0; i < promises.length; i++) {
			const j = i;
			promises[i]
				.then((d) => {
					resoults[j] = {
						data: d,
						err: null,
					};
					tryResolve();
				})
				.catch((err) => {
					resoults[j] = {
						data: null,
						err: err,
					};
					tryResolve();
				});
		}
	});
};
