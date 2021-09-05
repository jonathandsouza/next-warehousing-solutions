interface IToastService {
	promise: <T>(
		promise: Promise<any>,
		messages?: {
			pending: string;
			success: string;
			error: string;
		}
	) => Promise<T>;

	error: (message: React.ReactNode) => void;
}

export default IToastService;
