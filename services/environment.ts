import IEnvironment from '../models/environment';

const environment: IEnvironment = {
	getEndPointURL() {
		return process.env.NEXT_PUBLIC_ENV_HOST || '';
	},
};

export default environment;
