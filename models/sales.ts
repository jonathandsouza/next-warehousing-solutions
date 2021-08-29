interface ISale {
	id: string
	createdAt: Date
	productId: string
	amountSold: number
}

interface ISaleService {
	getAllSales(): Promise<Array<ISale>>
	createSale(sale: ISale): Promise<boolean>
	getSaleById(id: string): Promise<ISale>
	updateSale(sale: ISale): Promise<boolean>
	deleteSale(id: string): Promise<boolean>
}

export default ISale
