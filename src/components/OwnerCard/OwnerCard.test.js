import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OwnerCard from './OwnerCard';

const owner = {"username": "John", "name": "John Smith", "email": "jsmith@ua.pt", "properties": [
    {"id": 1, "name": "Property 1", "address": "Address1", "owner": "John",
      "cameras": [{"id": 1}, {"id": 2}], "alarms": [{"id": 1}, {"id": 2}, {"id": 3}]}
  ]};

describe('<OwnerCard />', () => {
  test('it should mount', () => {
    render(<OwnerCard />);
    
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

    const propertyCard = screen.getByTestId('OwnerUsername');

    expect(propertyCard).toBeInTheDocument();
    expect(propertyCard).toHaveTextContent(owner.username);
  });

  test('it should display owner name', () => {

    render(<OwnerCard owner={owner}/>);

    const propertyCard = screen.getByTestId('OwnerName');

    expect(propertyCard).toBeInTheDocument();
    expect(propertyCard).toHaveTextContent(owner.name);
  });

  test('it should display owner email', () => {

    render(<OwnerCard owner={owner}/>);

    const propertyCard = screen.getByTestId('OwnerEmail');

    expect(propertyCard).toBeInTheDocument();
    expect(propertyCard).toHaveTextContent(owner.email);
  });
});