import fetch from 'isomorphic-unfetch'

export default async function fetchAPI<JSON = any>(
	request: RequestInfo
): Promise<JSON> {
	const res = await fetch(request)
	const response = await res
	const jsonResponse = await response.json()
	return jsonResponse
}

export const fetchPOST = async function fetchPOST<JSON = any>(
	request: RequestInfo,
	payload: Record<string, any>
): Promise<JSON> {
	const res = await fetch(request, {
		method: 'POST',
		body: JSON.stringify(payload),

		headers: {
			'content-type': 'application/json',
		},
	})

	const response = await res

	const jsonResponse = await response.json()

	return jsonResponse
}
