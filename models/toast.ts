interface IToastService {
	promise: <T>(
		promise: Promise<any>,
		messages?: {
			pending: string;
			success: string;
			error: string;
		}
	) => Promise<T>;
}

export default IToastService;
