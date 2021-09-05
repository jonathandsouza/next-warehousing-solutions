import { toast } from 'react-toastify';
import IToastService from '../models/toast';

const ToastService: IToastService = {
	promise: (promise, messages) => {
		toast.promise(
			promise,
			messages || {
				pending: 'Saving ⏳',
				success: 'Save successful 👌',
				error: 'Save failed 🤯',
			},
			{
				position: 'bottom-left',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			}
		);

		return promise;
	},
};

export default ToastService;
