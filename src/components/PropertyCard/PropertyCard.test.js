import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropertyCard from './PropertyCard';

const property = {
    "id": 1, "name": "Property 1", "address": "Address 1", "owner": "John",
    "cameras": [{"id": "36e25c8c-165a-445a-b062-9b7a16195dd6"}], "alarms": [{"id": "135c8sdffd-9b7a16195dd6"}]
};

describe('<PropertyCard />', () => {
    test('it should mount', () => {
        render(<PropertyCard/>);

        const propertyCard = screen.getByTestId('PropertyCard');

        expect(propertyCard).toBeInTheDocument();
    });

    test('it should mount with property', () => {

        render(<PropertyCard property={property}/>);

        const propertyCard = screen.getByTestId('PropertyCard');
        expect(propertyCard).toBeInTheDocument();
    });

    test('it should display property id', () => {

        render(<PropertyCard property={property}/>);

        const titleID = screen.getByText("ID");
        const propertyID = screen.getByText(property.id);

        expect(titleID).toBeInTheDocument();
        expect(propertyID).toBeInTheDocument();
    });

    test('it should display property name', () => {

        render(<PropertyCard property={property}/>);

        // View the content
        const title = screen.getByText('Details');
        fireEvent.click(title);

        const propertyName = screen.getByText(property.name);

        expect(title).toBeInTheDocument();
        expect(propertyName).toBeInTheDocument();
    });

    test('it should display property address', () => {

        render(<PropertyCard property={property}/>);

        // View the content
        const title = screen.getByText('Details');
        fireEvent.click(title);

        const propertyAddress = screen.getByText(property.address);

        expect(title).toBeInTheDocument();
        expect(propertyAddress).toBeInTheDocument();
    });

    test('it should display property owner', () => {

        render(<PropertyCard property={property}/>);

        // View the content
        const title = screen.getByText('Details');
        fireEvent.click(title);

        const propertyOwner = screen.getByText(property.owner);

        expect(title).toBeInTheDocument();
        expect(propertyOwner).toBeInTheDocument();
    });

    test('it should display property cameras', () => {

        render(<PropertyCard property={property}/>);

        // View the content
        const title = screen.getByText('Cameras');
        fireEvent.click(title);

        const camera = screen.getByText(property.cameras[0].id);

        expect(title).toBeInTheDocument();
        expect(camera).toBeInTheDocument();
    });

    test('it should display property alarms', () => {

            render(<PropertyCard property={property}/>);

            // View the content
            const title = screen.getByText('Alarms');
            fireEvent.click(title);

            const alarm = screen.getByText(property.alarms[0].id);

            expect(title).toBeInTheDocument();
            expect(alarm).toBeInTheDocument();
    });
});