export default (date) => {
	const dataDate = new Date(date);
	const stringDates = [];

	for (let i = 0; i < 3; i++) {
		dataDate.setDate(dataDate.getDate() - 1);
		stringDates.push(
			`${dataDate.getDate() < 10 ? '0' + dataDate.getDate() : dataDate.getDate()}.${
				dataDate.getMonth() + 1 < 10 ? '0' + (dataDate.getMonth() + 1) : dataDate.getMonth() + 1
			}.${dataDate.getFullYear()}`,
		);
	}
	return stringDates;
};
