export default function() {
	const promises = [];

	if (isUdefined('fetch')) {
		promises.push(import('isomorphic-fetch'));
	}

	if (isUdefined('Proxy')) {
		promises.push(
			new Promise((resolve, reject) => {
				import('proxy-polyfill')
					.then(() => {
						window.Proxy.toString = () => 'Proxy';
						resolve();
					})
					.catch(reject);
			}),
		);
	}

	return Promise.all(promises);
}

function isUdefined(windowPropertyKey) {
	return window[windowPropertyKey] === undefined || typeof window[windowPropertyKey] === 'undefined';
}
