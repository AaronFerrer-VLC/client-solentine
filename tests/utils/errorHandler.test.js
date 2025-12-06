/**
 * Tests para Error Handler Utility
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getErrorMessage } from '../../src/utils/errorHandler';

// Mock Sentry
vi.mock('../../src/config/sentry', () => ({
    captureException: vi.fn()
}));

describe('Error Handler', () => {
    describe('getErrorMessage', () => {
        it('should return message from error.response.data.message', () => {
            const error = {
                response: {
                    data: {
                        message: 'Custom error message'
                    }
                }
            };

            const result = getErrorMessage(error);
            expect(result).toBe('Custom error message');
        });

        it('should return message from error.response.data.error', () => {
            const error = {
                response: {
                    data: {
                        error: 'Error message'
                    }
                }
            };

            const result = getErrorMessage(error);
            expect(result).toBe('Error message');
        });

        it('should return first error message from errors array', () => {
            const error = {
                response: {
                    data: {
                        errors: [
                            { message: 'First error' },
                            { message: 'Second error' }
                        ]
                    }
                }
            };

            const result = getErrorMessage(error);
            expect(result).toBe('First error');
        });

        it('should return error.message if available', () => {
            const error = {
                message: 'Error message'
            };

            const result = getErrorMessage(error);
            expect(result).toBe('Error message');
        });

        it('should return default message if no message found', () => {
            const error = {};

            const result = getErrorMessage(error, 'Default message');
            expect(result).toBe('Default message');
        });

        it('should return generic message if no default provided', () => {
            const error = {};

            const result = getErrorMessage(error);
            expect(result).toBe('Ha ocurrido un error. Por favor, intenta de nuevo.');
        });
    });
});

