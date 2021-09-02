import React, { FC, useRef, useState } from 'react'
import IArticle from '../../models/articles'
import Drawer from 'rc-drawer'
import { Field, Form } from 'react-final-form'
import Image from 'next/image'

import styles from './article-details.module.scss'
import ArticleService from '../../services/articles'

const ArticleDetails: FC<{ article: IArticle | null; onClose: () => void }> = ({
	article,
	onClose,
}) => {
	const [isOpen, setIsOpen] = useState(true)

	const ref = useRef(null)

	const onSubmit = (value: { name: string; amountInStock: number }) => {
		if (article) {
			ArticleService.updateArticles([{ ...article, ...value }])
		} else {
			ArticleService.createArticle(value)
		}
	}

	//region: submit all forms
	const submitForm = () => {
		const forms = document.getElementsByClassName('article-form')
		for (const form of forms) {
			form.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true })
			)
		}
	}
	// endregion;

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
				width={'70vw'}
				handler={false}
			>
				<div className={styles['drawer-container']}>
					<div className={styles['drawer-header']}>
						<div className={styles['close']} onClick={onClose}>
							<Image
								src="/cross.svg"
								alt=""
								width={30}
								height={30}
							/>
						</div>

						<div className={styles['drawer-title']}></div>
						<button
							className={styles['drawer-submit-button']}
							onClick={submitForm}
						>
							Save
						</button>
					</div>

					<Form
						onSubmit={onSubmit}
						initialValues={{
							name: article?.name,
							amountInStock: article?.amountInStock,
						}}
						render={({ handleSubmit }) => (
							<form
								onSubmit={handleSubmit}
								className="article-form"
							>
								<div className="form-title">Article</div>
								<div>
									<label>Name</label>
									<Field
										name="name"
										type="text"
										component="input"
										placeholder="Name"
									/>
								</div>

								<div>
									<label>Amount in stock</label>
									<Field
										name="amountInStock"
										component="input"
										type="number"
										placeholder="Amount in stock"
									/>
								</div>
							</form>
						)}
					/>
				</div>
			</Drawer>
		</>
	)
}

export default ArticleDetails
