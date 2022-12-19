import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoModal from './VideoModal';

const intrusion = {
    "id": 2,
    "propertyID": 3,
    "cameraID": "2b034ras-23-b062-9b7a16195dd6",
    "timestamp": "2022-11-30 05:41:09.845474",
    "videoKey": "propId3/cam2b034ras-23-b062-9b7a16195dd6/Video2022-11-30 05:41:09.845474"
};

describe('<VideoModal />', () => {
    test('it should mount', () => {
        render(<VideoModal/>);

        const videoModal = screen.getByTestId('VideoModal');

        expect(videoModal).toBeInTheDocument();
    });

    describe('without video', () => {
        test('it should be loading', () => {
            render(<VideoModal intrusion={intrusion}/>);

            const loading = screen.getByTestId('Loading');
            expect(loading).toBeInTheDocument();
        });
    });
});