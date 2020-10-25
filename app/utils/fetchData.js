export default async (API, enpoint) => {
	try {
		const response = await fetch(API + enpoint);
		return await response.json();
	} catch (err) {
		throw err;
	}
};
