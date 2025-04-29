import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router";

import Login from "./Login";
import { toast } from "react-toastify";


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

vi.mock("react-toastify", () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  }));

it('Should show error message if wrong email is entered', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'invalid#email.com' } });
    fireEvent.change(passwordInput, { target: { value: 123456 } });

    fireEvent.submit(screen.getByTestId('login-form'));
    
    await waitFor(() => {
        expect(screen.getByText(/invalid Email/i)).toBeInTheDocument();
    });
});

it('Should show toast error if credentials do not match', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = screen.getByTestId('login-form');

    fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
    fireEvent.change(passwordInput, { target: { value: '123456Aa' } });

    fireEvent.submit(form);

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Email or password don't match");
    });
});
