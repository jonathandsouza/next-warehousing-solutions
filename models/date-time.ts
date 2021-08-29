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

export interface IDateTimeService {
	dayNames: string[]
	monthNames: string[]
	convertToDateObj: (dateStr: string, type?: number) => Date
	differenceInDays: (d1: Date, d2: Date) => number
	formatDate: (
		d1: Date,
		format: DATE_FORMAT,
		options?: { isMonthLowercase?: boolean; isDayLowercase?: boolean }
	) => string | null
	mysqlStrToDate: (d: string) => Date
	addDays: (d: Date, days: number) => Date
	cloneDate: (
		d: Date,
		options?: {
			year?: number
			month?: number
			day?: number
			hour?: number
			minute?: number
		}
	) => Date
	isPastDate: (d: Date) => boolean
}
