import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardBlock from './CardBlock';

const title = 'Example Title';
const content = [{title: 'Example Title 1', content: 'Example Content 1'}];

describe('<CardBlock />', () => {
    test('it should mount', () => {
        render(<CardBlock/>);

        const cardBlock = screen.getByTestId('CardBlock');

        expect(cardBlock).toBeInTheDocument();
    });

    test('it should have a title', () => {
        render(<CardBlock title={title}/>);

        const cardBlockTitle = screen.getByText(title);
        expect(cardBlockTitle).toBeInTheDocument();
    });

    test('it should have content', () => {
        render(<CardBlock title={title} content={content}/>);

        // View the content
        const cardBlockTitle = screen.getByText(title);
        fireEvent.click(cardBlockTitle);

        const cardItem = screen.getByTestId('CardItem');
        expect(cardItem).toBeInTheDocument();
    });
});