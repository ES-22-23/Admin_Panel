import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IntrusionNotification from './IntrusionNotification';

const intrusion = {
    "id": 2,
    "propertyId": 3,
    "cameraId": "2b034ras-23-b062-9b7a16195dd6",
    "timestamp": "2022-11-30 05:41:09.845474",
    "videoKey": "propId3/cam2b034ras-23-b062-9b7a16195dd6/Video2022-11-30 05:41:09.845474"
};

describe('<IntrusionNotification />', () => {
    test('it should mount', () => {
        render(<IntrusionNotification intrusion={intrusion}/>);

        const intrusionCard = screen.getByTestId('IntrusionNotification');

        expect(intrusionCard).toBeInTheDocument();
    });

    test('it should display intrusion property ID', () => {

        render(<IntrusionNotification intrusion={intrusion}/>);

        const titlePropertyID = screen.getByText("Property ID:");
        const intrusionPropertyID = screen.getByText(intrusion.propertyId);

        expect(titlePropertyID).toBeInTheDocument();
        expect(intrusionPropertyID).toBeInTheDocument();
    });

    test('it should display intrusion camera ID', () => {

        render(<IntrusionNotification intrusion={intrusion}/>);

        const titleCameraID = screen.getByText("Camera ID:");
        const intrusionCameraID = screen.getByText(intrusion.cameraId);

        expect(titleCameraID).toBeInTheDocument();
        expect(intrusionCameraID).toBeInTheDocument();
    });

    test('it should display intrusion date', () => {

        render(<IntrusionNotification intrusion={intrusion}/>);

        const titleIntrusionDate = screen.getByText("Intrusion Date");
        const intrusionDate = screen.getByText(new Date(intrusion.timestamp).toLocaleString());

        expect(titleIntrusionDate).toBeInTheDocument();
        expect(intrusionDate).toBeInTheDocument();
    });
});