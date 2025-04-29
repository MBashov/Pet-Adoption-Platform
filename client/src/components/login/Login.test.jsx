import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router";

import Login from "./Login";


vi.mock("../../api/authApi", () => ({
    useLogin: () => ({
        login: vi.fn().mockRejectedValue(new Error('Invalid credentials')),
    }),
}));

vi.mock("../../context/useUserContext", () => ({
    useUserContext: () => ({
        authHandler: vi.fn(),
    }),
}));

it('Should show error message if wrong email is entered', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /ogin/i });

    fireEvent.change(emailInput, { target: { value: 'invalid#email.com' } });
    fireEvent.change(passwordInput, { target: { value: 123456 } });

    fireEvent.submit(screen.getByTestId('login-form'));
    
    await waitFor(() => {
        expect(screen.getByText(/invalid Email/i)).toBeInTheDocument();
    });
});

