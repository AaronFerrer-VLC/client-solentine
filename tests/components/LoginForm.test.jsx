/**
 * Tests para LoginForm Component
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../components/User/LoginForm/LoginForm';
import { AuthContext } from '../../contexts/auth.context';

// Mock auth context
const mockLoginUser = vi.fn();
const mockAuthContextValue = {
  loggedUser: null,
  loginUser: mockLoginUser,
  logoutUser: vi.fn(),
  authenticateUser: vi.fn(),
  isFetchingUser: false,
  hasRole: vi.fn(),
  isAdmin: vi.fn(),
  error: null,
  setError: vi.fn()
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={mockAuthContextValue}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('LoginForm', () => {
  it('should render login form', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login|iniciar sesión/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    renderWithProviders(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /login|iniciar sesión/i });
    submitButton.click();

    await waitFor(() => {
      // Verificar que se muestran mensajes de error
      expect(screen.getByText(/email|correo/i)).toBeInTheDocument();
    });
  });
});

