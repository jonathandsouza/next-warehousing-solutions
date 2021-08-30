import { action, observable } from 'mobx'
import { createContext } from 'react'
import ILoaderService from '../models/loader'

const LoaderService: ILoaderService = observable(
	{
		show: false,
		hideLoader() {
			LoaderService.show = false
		},
		showLoader() {
			LoaderService.show = true
		},
	},
	{
		hideLoader: action,
		showLoader: action,
	}
)

const LoaderContext = createContext(LoaderService)

export default LoaderContext
