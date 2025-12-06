/**
 * Sentry Configuration for Client
 * 
 * Error tracking y monitoring en producción
 */

import * as Sentry from '@sentry/react';

/**
 * Inicializa Sentry en el cliente
 */
export function initSentry() {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    
    if (!dsn) {
        console.warn('⚠️  VITE_SENTRY_DSN no configurada - Error tracking deshabilitado');
        return;
    }

    Sentry.init({
        dsn,
        environment: import.meta.env.MODE || 'development',
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],
        tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        beforeSend(event, hint) {
            // Filtrar información sensible
            if (event.request) {
                if (event.request.data) {
                    const data = event.request.data;
                    if (data.password) {
                        event.request.data = { ...data, password: '[REDACTED]' };
                    }
                }
            }
            return event;
        }
    });

    console.log('✅ Sentry inicializado en cliente');
}

/**
 * Captura una excepción en Sentry
 */
export function captureException(error, context = {}) {
    if (import.meta.env.VITE_SENTRY_DSN) {
        Sentry.withScope((scope) => {
            Object.keys(context).forEach(key => {
                scope.setContext(key, context[key]);
            });
            Sentry.captureException(error);
        });
    }
}

/**
 * Captura un mensaje en Sentry
 */
export function captureMessage(message, level = 'info', context = {}) {
    if (import.meta.env.VITE_SENTRY_DSN) {
        Sentry.withScope((scope) => {
            Object.keys(context).forEach(key => {
                scope.setContext(key, context[key]);
            });
            Sentry.captureMessage(message, level);
        });
    }
}

