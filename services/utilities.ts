export const SortAlphabetically = (prop: string) =>
	function (a: any, b: any) {
		if (a[prop].toUpperCase() < b[prop].toUpperCase()) {
			return -1;
		}
		if (a[prop].toUpperCase() > b[prop].toUpperCase()) {
			return 1;
		}
		return 0;
	};
