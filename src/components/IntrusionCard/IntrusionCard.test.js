import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IntrusionCard from './IntrusionCard';

const intrusion = {
    "propertyID": "2",
    "cameraID": "36e25c8c-165a-445a-b062-9b7a16195dd6",
    "intrusionDate": new Date().toLocaleString()
};

describe('<IntrusionCard />', () => {
    test('it should mount', () => {
        render(<IntrusionCard/>);

        const intrusionCard = screen.getByTestId('IntrusionCard');

        expect(intrusionCard).toBeInTheDocument();
    });

    test('it should mount with intrusion', () => {

        render(<IntrusionCard intrusion={intrusion}/>);

        const intrusionCard = screen.getByTestId('IntrusionCard');
        expect(intrusionCard).toBeInTheDocument();
    });

    test('it should display intrusion property ID', () => {

        render(<IntrusionCard intrusion={intrusion}/>);

        const titlePropertyID = screen.getByText("Property ID");
        const intrusionPropertyID = screen.getByText(intrusion.propertyID);

        expect(titlePropertyID).toBeInTheDocument();
        expect(intrusionPropertyID).toBeInTheDocument();
    });

    test('it should display intrusion camera ID', () => {

        render(<IntrusionCard intrusion={intrusion}/>);

        const titleCameraID = screen.getByText("Camera ID");
        const intrusionCameraID = screen.getByText(intrusion.cameraID);

        expect(titleCameraID).toBeInTheDocument();
        expect(intrusionCameraID).toBeInTheDocument();
    });

    test('it should display intrusion date', () => {

        render(<IntrusionCard intrusion={intrusion}/>);

        const titleIntrusionDate = screen.getByText("Intrusion Date");
        const intrusionDate = screen.getByText(intrusion.intrusionDate);

        expect(titleIntrusionDate).toBeInTheDocument();
        expect(intrusionDate).toBeInTheDocument();
    });

    test('it should display view video button', () => {

        render(<IntrusionCard intrusion={intrusion}/>);

        const viewVideoButton = screen.getByText("View Video");
        expect(viewVideoButton).toBeInTheDocument();
    });

    test('it should display download video button', () => {

        render(<IntrusionCard intrusion={intrusion}/>);

        const downloadVideoButton = screen.getByText("Download Video");
        expect(downloadVideoButton).toBeInTheDocument();
    });
});