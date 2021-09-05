import IDateTimeService from '../models/date-time';

const DateTimeService: IDateTimeService = {
	mysqlStrToDate(d) {
		const t = d.split(/[- :]/);
		return new Date(
			parseInt(t[0]),
			parseInt(t[1]) - 1,
			t[2] ? parseInt(t[2]) : 1,
			t[3] ? parseInt(t[3]) : 0,
			t[4] ? parseInt(t[4]) : 0,
			t[5] ? parseInt(t[5]) : 0
		);
	},
};

export default DateTimeService;
