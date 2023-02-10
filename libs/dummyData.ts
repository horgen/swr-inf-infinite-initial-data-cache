export type FeedReponse = {
	self_uri: string,
	page?: number,
	items?: string[],
};

export const feedReponse = (self_uri: string, page?: number): FeedReponse => {
	return {
		self_uri,
		...(page ? { page, items: ['item', 'item', 'item'] } : {})
	};
};
