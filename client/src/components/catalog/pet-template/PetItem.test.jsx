import { it, expect, beforeEach } from 'vitest'
import { cleanup, getByText, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import PetTemplate from './PetTemplate'

beforeEach(() => {
    cleanup();
});


it('Should display pet item', () => {

    const mockPet = {
        imageUrls: ['https://example.com/pet.jpg'],
        name: 'Max',
        breed: 'Labrador',
        age: 3,
        _id: 'abc123',
    };
    render(
        <MemoryRouter>
            <PetTemplate pet={mockPet} />
        </MemoryRouter>
    );

    const h3 = getByText(document, mockPet.name);
    const p = getByText(document, `${mockPet.breed} - ${mockPet.age} Years Old`);

    expect(h3.textContent).toEqual('Max');
    expect(p.textContent).toEqual('Labrador - 3 Years Old');
})