import React, {useState as useStateMock} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import History from './History';
import {getActions} from "../../utils/ApiHandler";
import axios from "axios";

jest.mock("axios");
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<History />', () => {

    const setState = jest.fn();

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState]);
    });

    test('it should mount', () => {
        render(<History/>);

        const history = screen.getByTestId('History');

        expect(history).toBeInTheDocument();
    });

    test('it should have an entity filter', () => {
        render(<History/>);

        const entityFilter = screen.getByTestId('EntityForm');

        expect(entityFilter).toBeInTheDocument();
    });

    test('it should have an action filter', () => {
        render(<History/>);

        const actionFilter = screen.getByTestId('ActionForm');

        expect(actionFilter).toBeInTheDocument();
    });

    describe("With Actions", () => {
        test('it should obtain history (actions)', async () => {
            const mockHistory = [
                {"id": 1, "date": "2022-11-01T12:00:00", "admin": "Danny", "action_type": "CREATED", "entity_type": "Owner", "entity_id": "John"},
                {"id": 2, "date": "2022-11-01T13:40:00", "admin": "Danny", "action_type": "CREATED", "entity_type": "Property", "entity_id": 1},
                {"id": 3, "date": "2022-11-01T14:15:00", "admin": "Mary", "action_type": "DELETED", "entity_type": "Owner", "entity_id": "John"},
                {"id": 4, "date": "2022-11-01T15:04:00", "admin": "Danny", "action_type": "CREATED", "entity_type": "Property", "entity_id": 2},
            ];

            axios.get.mockResolvedValueOnce({data: mockHistory});

            const response = await getActions();

            expect(axios.get).toHaveBeenCalled();
            expect(response.data).toEqual(mockHistory);
        });
    });

    describe('Without actions', () => {
        test('it should display no results', () => {
            render(<History/>);

            const noResults = screen.getByText("No results.");

            expect(noResults).toBeInTheDocument();
        });
    });
});