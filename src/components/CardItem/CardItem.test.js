import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardItem from './CardItem';

const title = 'Example Title';
const content = 'Example Content';

describe('<CardItem />', () => {
    test('it should mount', () => {
        render(<CardItem/>);

        const cardItem = screen.getByTestId('CardItem');

        expect(cardItem).toBeInTheDocument();
    });

    test('it should have a title', () => {
        render(<CardItem title={title}/>);

        const cardItem = screen.getByTestId('CardItem');
        const titleElement = screen.getByText(title);

        expect(cardItem).toContainHTML(title);
        expect(titleElement).toBeInTheDocument();
    });

    test('it should have a content', () => {
        render(<CardItem content={content}/>);

        const cardItem = screen.getByTestId('CardItem');
        const contentElement = screen.getByText(content);

        expect(cardItem).toContainHTML(content);
        expect(contentElement).toBeInTheDocument();
    });
});