import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteModal from './DeleteModal';

const property = {
    "id": 1, "name": "Property 1", "address": "Address 1", "owner": {"username": "John"},
    "cameras": ["a30c95b6-073b-4616-9b3d-f5c24304768c"], "alarms": ["b9823-073b-4616-9b3d-f5c2qwe4768c"]
};

describe('<DeleteModal />', () => {
    test('it should mount', () => {
        render(<DeleteModal property={property}/>);

        const deleteModal = screen.getByTestId('DeleteModal');

        expect(deleteModal).toBeInTheDocument();
    });

    test('it should display property ID', () => {
        render(<DeleteModal property={property}/>);

        const propertyId = screen.getByTestId('PropertyID');

        expect(propertyId).toBeInTheDocument();
        expect(propertyId).toHaveTextContent(property.id);
    });
});