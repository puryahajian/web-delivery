import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrgLogin from './org-login.jsx';

// Mocks
const mockMutate = jest.fn();
const mockMutateVerify = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../../hooks/use-post-login', () => ({
  __esModule: true,
  default: () => ({ mutate: mockMutate, isPending: false }),
}));

jest.mock('../../../hooks/use-post-verify', () => ({
  __esModule: true,
  default: () => ({ mutate: mockMutateVerify, isPending: false }),
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('OrgLogin', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Arabic titles', () => {
        render(<OrgLogin />);
        expect(screen.getByText('مرحباً!')).toBeInTheDocument();
        expect(screen.getByText('يرجى إدخال رقم الهاتف لتسجيل الدخول')).toBeInTheDocument();
        expect(screen.getByText('رقم الهاتف')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'الحصول على رمز التحقق' })).toBeInTheDocument();
    });

    test('submits phone to request OTP and goes to step 2 on success', async () => {
        mockMutate.mockImplementation((_vars, { onSuccess }) => {
            onSuccess();
        });
        render(<OrgLogin />);

        const phoneInput = screen.getByRole('textbox');
        fireEvent.change(phoneInput, { target: { value: '09120000000' } });

        fireEvent.click(screen.getByRole('button', { name: 'الحصول على رمز التحقق' }));

        // After success, step should be 2 with OTP inputs and submit button
        await waitFor(() => {
            expect(screen.getByText('رمز التحقق')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'تسجيل الدخول' })).toBeInTheDocument();
        });
    });

    test('shows error message on login error', async () => {
        mockMutate.mockImplementation((_vars, { onError }) => {
            onError(new Error('fail'));
        });
        render(<OrgLogin />);

        const phoneInput = screen.getByRole('textbox');
        fireEvent.change(phoneInput, { target: { value: 'invalid' } });

        fireEvent.click(screen.getByRole('button', { name: 'الحصول على رمز التحقق' }));

        await waitFor(() => {
            expect(screen.getByText('اسم المستخدم أو كلمة المرور غير صحيحة!')).toBeInTheDocument();
        });
    });

    test('submits OTP and navigates on verify success', async () => {
        // First step: move to step 2
        mockMutate.mockImplementation((_vars, { onSuccess }) => onSuccess());
        mockMutateVerify.mockImplementation((_vars, { onSuccess }) => onSuccess());

        render(<OrgLogin />);

        const phoneInput = screen.getByRole('textbox');
        fireEvent.change(phoneInput, { target: { value: '09120000000' } });
        fireEvent.click(screen.getByRole('button', { name: 'الحصول على رمز التحقق' }));

        // There are 4 OTP inputs from react-otp-input
        const otpInputs = await screen.findAllByRole('textbox');
        // Last 4 inputs are OTP inputs (there might still be phone input in DOM tree depending on implementation)
        const lastFour = otpInputs.slice(-4);
            lastFour.forEach((input, idx) => {
            fireEvent.change(input, { target: { value: String((idx + 1) % 10) } });
        });

        fireEvent.click(screen.getByRole('button', { name: 'تسجيل الدخول' }));

        await waitFor(() => {
            expect(mockMutateVerify).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});


