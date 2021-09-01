import React, { FC, useState } from 'react'
import IArticle from '../../models/articles'
import Drawer from 'rc-drawer'

const ArticleDetails: FC<{ article: IArticle | null; onClose: () => void }> = ({
	article,
	onClose,
}) => {
	const [isOpen, setIsOpen] = useState(true)

	const [name, setName] = useState(article?.name ?? '')
	const [amount, setAmount] = useState(article?.amountInStock ?? 0)

	return (
		<>
			<Drawer
				open={isOpen}
				level={null}
				placement={'right'}
				onClose={() => {
					console.log('on close click')
					setIsOpen(false)
					onClose()
				}}
				onHandleClick={() => {
					console.log('on handle click')
					setIsOpen(false)
					onClose()
				}}
			>
				<>
					<div className="drawer-header"></div>

					<form onSubmit={handleSubmit}>
						<label>
							name:
							<input type="text" name="" id="" />
						</label>

						<label>
							amount in stock:
							<input type="number" name="" id="" />
						</label>
					</form>
				</>
				{JSON.stringify(article)}
			</Drawer>
		</>
	)
}

export default ArticleDetails
