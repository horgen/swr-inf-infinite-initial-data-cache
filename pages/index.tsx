import React, { ReactElement } from 'react';
import Feed from '../components/Feed';
import { feedReponse } from "../libs/dummyData";

const Index = (): ReactElement => {
	const initialData = [
		feedReponse('/api/feed-1', 1),
		feedReponse('/api/feed-2', 2),
	];

	console.log('initialData', initialData);

	return (
		<>
			{initialData.map((feed, i) => <Feed key={`feed-${i}`} initialData={feed} />)}
		</>
	);
};

export default Index;
