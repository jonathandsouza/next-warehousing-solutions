export enum DATE_FORMAT {
	YYYY_MM_DD = 0,
	DD_MM_YYYY = 1,
	WD_DD_MMM_YYYY_HH_MM = 2,
	D_MMMM_YYYY = 3,
	WD_DD_MMMM_YYYY = 4,
	WD_DD_MMM_YYYY = 5,
	WD_DD_MMM = 6,
	WD_DD_MMM_HH_MM = 7,
	YYYY_MM = 8,
	MMMM_YYYY = 9,
	WDWDWD_DD_MMMM_YYYY = 10,
	WDWDWD_D_MMMM = 11,
	D_MMM = 12,
}

interface IDateTimeService {
	mysqlStrToDate: (d: string) => Date;
}

export default IDateTimeService;
