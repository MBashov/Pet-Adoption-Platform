import { it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import PetTemplate from './PetTemplate'


const mockPet = {
    imageUrls: ['https://example.com/pet.jpg'],
    name: 'Max',
    breed: 'Labrador',
    age: 3,
    _id: 'abc123',
};


it('Should display pet item', () => {

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

it('Should navigate to details page on "View Details', () => {
    const PetDetails = () => <div>Pet Details Page for {mockPet.name}</div>;

    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path='/' element={<PetTemplate pet={mockPet} />} />
                <Route path={`/pets/${mockPet._id}/details`} element={<PetDetails />} />
            </Routes>
        </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'View Details' });
    fireEvent.click(link);

    expect(screen.getByText(`Pet Details Page for ${mockPet.name}`)).toBeInTheDocument();
});