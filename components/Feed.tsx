import React, { ReactElement } from 'react';
import useSWRInfinite from 'swr/infinite';
import { FeedReponse } from '../libs/dummyData';
import fetcher from '../libs/fetch';

const getKey = (index: number, uri: string) => {
	return [uri, index + 1];
}

type Props = {
	initialData: FeedReponse,
}
const Feed = ({ initialData }: Props): ReactElement => {
	const hasInitialData = initialData.items && initialData.items.length;
	const uri = initialData.self_uri;
	const {
		data: response,
		mutate,
		size,
		setSize,
	} = useSWRInfinite<FeedReponse>((index) => getKey(index, uri), fetcher, {
		fallbackData: hasInitialData ? [initialData] : undefined,
		revalidateAll: false,
		revalidateFirstPage: false,
		revalidateOnFocus: false
	});

	if (!response) {
		return null;
	}

	let data: FeedReponse;
	response.length && response.forEach((pageData) => {
		data = {
			...data,
			...pageData,
			items: [
				...(data && data.items || []),
				...pageData.items
			]
		};
	});

	return (
		<>
			<h2>{uri}</h2>
			<ul>
				{data.items.map((item, i) => (
					<h3 key={`${uri}-${i}`}>{i + 1}. {item}</h3>
				))}
			</ul>
			<button type="button" onClick={() => setSize(size + 1)}>Load more</button>
			<button type="button" onClick={() => mutate()}>Refresh</button>
		</>
	);
};

export default Feed;
