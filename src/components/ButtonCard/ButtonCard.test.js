import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonCard from './ButtonCard';
import {BrowserRouter} from "react-router-dom";

const title = "Properties";
const description = "View all properties";
const link = "/properties";
const icon = "BsFillHouseDoorFill";

describe('<ButtonCard />', () => {
    test('it should mount', () => {
        render(<BrowserRouter><ButtonCard
            title={title}
            description={description}
            link={link}
            icon={icon}
        />
        </BrowserRouter>);

        const buttonCard = screen.getByTestId(title + 'Button');
        expect(buttonCard).toBeInTheDocument();
    });

    test('it should display the title', () => {
        render(<BrowserRouter><ButtonCard
            title={title}
            description={description}
            link={link}
            icon={icon}
        />
        </BrowserRouter>);

        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
    });

    test('it should display the description', () => {
        render(<BrowserRouter><ButtonCard
            title={title}
            description={description}
            link={link}
            icon={icon}
        />
        </BrowserRouter>);

        const descriptionElement = screen.getByText(description);
        expect(descriptionElement).toBeInTheDocument();
    });

    test('it should redirect to the link', () => {
        render(<BrowserRouter><ButtonCard
            title={title}
            description={description}
            link={link}
            icon={icon}
        />
        </BrowserRouter>);

        const buttonCard = screen.getByTestId(title + 'Button');

        expect(buttonCard).toBeInTheDocument();
        expect(buttonCard).toHaveAttribute("href", link);
    });
});