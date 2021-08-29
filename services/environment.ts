import IEnvironment from '../models/environment'

const environment: IEnvironment = {
	getEndPointURL() {
		return 'http://localhost:7000/articles/'
	},
}

export default environment
