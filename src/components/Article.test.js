import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testArticle = {
    author: 'tester',
    id: 'aMqwd', //unique article id
    headline: "headline", //title of article
    createdOn: '2021-08-09T18:02:38-04:00', //timestamp of when article was added
    summary: "summary", //short summary statement of article
      body: ""  //paragraph of article text
}
const testAuthor = {
    author: '',
    id: 'aMqwd', //unique article id
    headline: "headline", //title of article
    createdOn: '2021-08-09T18:02:38-04:00', //timestamp of when article was added
    summary: "summary", //short summary statement of article
      body: ""  //paragraph of article text
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle} />)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>)
    const headline = screen.queryByTestId(/headline/i)
    const author = screen.queryAllByTestId(/author/i)

    expect(headline).toBeInTheDocument()
    expect(author).toBeInTheDocument()
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testAuthor}/>)
    const author = screen.queryAllByTestId(/author/i)
    expect(author).toHaveTextContent(/Associated Press/i)
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    const handleDelete = jest.fn()
    render(<Article article={testArticle} handleDelete={handleDelete}/>)
    const deleteBtn = screen.queryAllByTestId('deleteButton')
    userEvent.click(deleteBtn)
    
    await waitFor(() => {
        expect(handleDelete).toHaveBeenCalled()
    })
});

//Task List:
//1. Complete all above tests. Create test article data when needed.