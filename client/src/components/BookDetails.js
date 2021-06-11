import React from 'react';
import { getBookQuery } from '../apolloAPI';
import { useQuery } from '@apollo/client';

function BookDetails({ bookId }) {
	const { loading, data } = useQuery(getBookQuery, {
		variables: { id: bookId },
	});
	const getBookDetails = () => {
		if (data) {
			return (
				<div>
					<h2>{data.book.name}</h2>
					<p>{data.book.genre}</p>
					<p>{data.book.author.name}</p>
					<p>All books by this author: </p>
					<ul className='other-books'>
						{data.book.author.books.map((bookItem) => (
							<li key={bookItem.id}>{bookItem.name}</li>
						))}
					</ul>
				</div>
			);
		} else {
			return <div>No book selected</div>;
		}
	};
	return <div id='book-details'>{getBookDetails()}</div>;
}

export default BookDetails;
