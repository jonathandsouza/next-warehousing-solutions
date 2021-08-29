import IArticle, { IArticleService } from '../models/articles'
import environment from './environment'
import fetchAPI, { fetchDELETE, fetchPATCH, fetchPOST } from './fetch'

const ArticleService: IArticleService = {
	getAllArticles() {
		return fetchAPI(environment.getEndPointURL() + 'articles').then(
			(response) => {
				return (response as any).map((data: any) => ({
					id: data.id,
					name: data.name,
					amountInStock: data.amountInStock,
				}))
			}
		)
	},

	getArticleById(id) {
		return fetchAPI(environment.getEndPointURL() + 'articles/' + id).then(
			(response: any) => {
				return {
					id: response.id,
					name: response.name,
					amountInStock: response.amountInStock,
				}
			}
		)
	},

	createArticle(article: IArticle) {
		return fetchPOST(environment.getEndPointURL() + 'articles', {
			name: article.name,
			amountInStock: article.amountInStock,
		})
	},

	removeArticleById(id) {
		return fetchDELETE(environment.getEndPointURL() + 'articles/' + id)
	},

	updateArticles(articles) {
		return fetchPATCH(environment.getEndPointURL() + 'articles', articles)
	},
}

export default ArticleService
