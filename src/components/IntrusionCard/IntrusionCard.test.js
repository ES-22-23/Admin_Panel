import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IntrusionCard from './IntrusionCard';

const intrusion = {
    "id": 2,
    "propertyID": 3,
    "cameraID": "2b034ras-23-b062-9b7a16195dd6",
    "timestamp": "2022-11-30 05:41:09.845474",
    "videoKey": "propId3/cam2b034ras-23-b062-9b7a16195dd6/Video2022-11-30 05:41:09.845474"
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
        const intrusionDate = screen.getByText(new Date(intrusion.timestamp).toLocaleString());

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