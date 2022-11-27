import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServiceCard from './ServiceCard';

const service = {
    "id": "36e25c8c-165a-445a-b062-9b7a16195dd6",
    "componentName": "Camera",
    "healthEndpoint": "/health",
    "componentProtocol": "HTTP",
    "componentType": "CAMERA",
    "componentAddress": {
        "id": 41,
        "privateAddress": "10.0.10.2",
        "publicAddress": "2.34.23.220"
    },
    "componentAvailability": {
        "id": 61,
        "availability": "OFFLINE",
        "lastTimeOnline": 1669236289649
    }
};

describe('<ServiceCard />', () => {
    test('it should mount', () => {
        render(<ServiceCard/>);

        const serviceCard = screen.getByTestId('ServiceCard');

        expect(serviceCard).toBeInTheDocument();
    });

    test('it should mount with service', () => {

        render(<ServiceCard service={service}/>);

        const serviceCard = screen.getByTestId('ServiceCard');
        expect(serviceCard).toBeInTheDocument();
    });

    test('it should display service ID', () => {
        render(<ServiceCard service={service}/>);

        const titleID = screen.getByText('ID');
        const serviceID = screen.getByText(service.id);

        expect(titleID).toBeInTheDocument();
        expect(serviceID).toBeInTheDocument();
    });

    test('it should display service name', () => {
        render(<ServiceCard service={service}/>);

        // View the content
        const titleName = screen.getByText('Identification');
        fireEvent.click(titleName);

        const serviceName = screen.getByText(service.componentName);

        expect(titleName).toBeInTheDocument();
        expect(serviceName).toBeInTheDocument();
    });

    test('it should display service availability', () => {
        render(<ServiceCard service={service}/>);

        // View the content
        const titleAvailability = screen.getByText('Availability');
        fireEvent.click(titleAvailability);

        const serviceAvailability = screen.getByText(service.componentAvailability.availability);

        expect(titleAvailability).toBeInTheDocument();
        expect(serviceAvailability).toBeInTheDocument();
    });

    test('it should display service last time online', () => {
        render(<ServiceCard service={service}/>);

        // View the content
        const titleAvailability = screen.getByText('Availability');
        fireEvent.click(titleAvailability);

        const date = new Date(service.componentAvailability.lastTimeOnline).toLocaleString();
        const serviceLastTimeOnline = screen.getByText(date);

        expect(titleAvailability).toBeInTheDocument();
        expect(serviceLastTimeOnline).toBeInTheDocument();
    });

    test('it should display service private address', () => {
        render(<ServiceCard service={service}/>);

        // View the content
        const titleAddress = screen.getByText('Address');
        fireEvent.click(titleAddress);

        const serviceAddress = screen.getByText(service.componentAddress.privateAddress);

        expect(titleAddress).toBeInTheDocument();
        expect(serviceAddress).toBeInTheDocument();
    });

    test('it should display service public address', () => {
        render(<ServiceCard service={service}/>);

        // View the content
        const titleAddress = screen.getByText('Address');
        fireEvent.click(titleAddress);

        const serviceAddress = screen.getByText(service.componentAddress.publicAddress);

        expect(titleAddress).toBeInTheDocument();
        expect(serviceAddress).toBeInTheDocument();
    });
});