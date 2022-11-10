import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropertyCard from './PropertyCard';

const property = {"id": 1, "name": "Property 1", "address": "Address 1", "owner": "John",
  "cameras": [{"id": 1}, {"id": 2}], "alarms": [{"id": 1}, {"id": 2}, {"id": 3}]};

describe('<PropertyCard />', () => {
  test('it should mount', () => {
    render(<PropertyCard />);
    
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

    const propertyCard = screen.getByTestId('PropertyId');

    expect(propertyCard).toBeInTheDocument();
    expect(propertyCard).toHaveTextContent(property.id);
  });

  test('it should display property name', () => {

    render(<PropertyCard property={property}/>);

    const propertyCard = screen.getByTestId('PropertyName');

    expect(propertyCard).toBeInTheDocument();
    expect(propertyCard).toHaveTextContent(property.name);
  });

  test('it should display property address', () => {

    render(<PropertyCard property={property}/>);

    const propertyCard = screen.getByTestId('PropertyAddress');

    expect(propertyCard).toBeInTheDocument();
    expect(propertyCard).toHaveTextContent(property.address);
  });
});