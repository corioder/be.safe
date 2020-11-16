export default (date) => {
	const dataDate = new Date(date);
	dataDate.setMonth(dataDate.getMonth() + 1);
	const stringDates = [];

	for (let i = 0; i < 3; i++) {
		dataDate.setDate(dataDate.getDate() - 1);
		stringDates.push(
			`${dataDate.getDate() < 10 ? '0' + dataDate.getDate() : dataDate.getDate()}.${
				dataDate.getMonth() < 10 ? '0' + dataDate.getMonth() : dataDate.getMonth()
			}.${dataDate.getFullYear()}`,
		);
	}
	return stringDates;
};
