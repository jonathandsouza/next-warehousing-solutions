interface IToastService {
	promise: (
		promise: Promise<any>,
		messages?: {
			pending: string
			success: string
			error: string
		}
	) => void
}

export default IToastService
