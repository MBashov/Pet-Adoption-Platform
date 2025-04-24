import { it, expect, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
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

    const h3 = screen.getByText(mockPet.name);
    const p = screen.getByText(`${mockPet.breed} - ${mockPet.age} Years Old`);
    const img = screen.getByAltText(mockPet.name);
    const link = screen.getByRole('link', { name: 'View Details' });

    expect(h3.textContent).toEqual('Max');
    expect(p.textContent).toEqual('Labrador - 3 Years Old');
    expect(p).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPet.imageUrls[0]);
    expect(link).toHaveAttribute('href', `/pets/${mockPet._id}/details`);
});