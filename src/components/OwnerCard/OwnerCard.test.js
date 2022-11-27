import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OwnerCard from './OwnerCard';

const owner = {
    "username": "John", "name": "John Smith", "email": "jsmith@ua.pt", "properties": [
        {
            "id": 1, "name": "Property 1", "address": "Address1", "owner": "John",
            "cameras": [{"id": 1}, {"id": 2}], "alarms": [{"id": 1}, {"id": 2}, {"id": 3}]
        }
    ]
};

describe('<OwnerCard />', () => {
    test('it should mount', () => {
        render(<OwnerCard/>);

        const ownerCard = screen.getByTestId('OwnerCard');

        expect(ownerCard).toBeInTheDocument();
    });

    test('it should mount with owner', () => {

        render(<OwnerCard owner={owner}/>);

        const propertyCard = screen.getByTestId('OwnerCard');
        expect(propertyCard).toBeInTheDocument();
    });

    test('it should display owner username', () => {

        render(<OwnerCard owner={owner}/>);

        const titleUsername = screen.getByText("Username");
        const ownerUsername = screen.getByText(owner.username);

        expect(titleUsername).toBeInTheDocument();
        expect(ownerUsername).toBeInTheDocument();
    });

    test('it should display owner name', () => {

        render(<OwnerCard owner={owner}/>);

        // View the content
        const title = screen.getByText('Details');
        fireEvent.click(title);

        const ownerName = screen.getByText(owner.name);

        expect(title).toBeInTheDocument();
        expect(ownerName).toBeInTheDocument();
    });

    test('it should display owner email', () => {

        render(<OwnerCard owner={owner}/>);

        // View the content
        const title = screen.getByText('Details');
        fireEvent.click(title);

        const ownerEmail = screen.getByText(owner.email);

        expect(title).toBeInTheDocument();
        expect(ownerEmail).toBeInTheDocument();
    });
});