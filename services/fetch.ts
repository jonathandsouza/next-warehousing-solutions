import fetch from 'isomorphic-unfetch'

export default async function fetchAPI<JSON = any>(
	request: RequestInfo
): Promise<JSON> {
	const res = await fetch(request)
	const response = await res
	const jsonResponse = await response.json()

	if (jsonResponse.message && jsonResponse.message.length) {
		return Promise.reject(jsonResponse)
	}

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

	if (jsonResponse.message && jsonResponse.message.length) {
		return Promise.reject(jsonResponse)
	}

	return jsonResponse
}

export const fetchDELETE = async function fetchPOST<JSON = any>(
	request: RequestInfo
): Promise<JSON | any> {
	const res = await fetch(request, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
		},
	})

	const response = await res

	if (response.status === 204) {
		return Promise.resolve(true)
	}

	const jsonResponse = await response.json()

	if (jsonResponse.message && jsonResponse.message.length) {
		return Promise.reject(jsonResponse)
	}

	return jsonResponse
}

export const fetchPATCH = async function fetchPOST<JSON = any>(
	request: RequestInfo,
	payload: Record<string, any>
): Promise<JSON> {
	const res = await fetch(request, {
		method: 'PATCH',
		body: JSON.stringify(payload),
		headers: {
			'content-type': 'application/json',
		},
	})

	const response = await res

	const jsonResponse = await response.json()

	if (jsonResponse.message && jsonResponse.message.length) {
		return Promise.reject(jsonResponse)
	}

	return jsonResponse
}
