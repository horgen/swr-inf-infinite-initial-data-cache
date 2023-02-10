import { feedReponse } from "./dummyData";

export default async function fetcher([uri, page]) {
	await new Promise(res => setTimeout(res, 100))

	console.log('FETCH: ', uri, page);

	return feedReponse(uri, page);
}
