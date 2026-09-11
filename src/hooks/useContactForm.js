import { useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValuesByMode = {
  raising: { name: '', email: '', message: '' },
  investor: { name: '', email: '', ticketSize: '', sectors: '' },
};

/**
 * Minimal form state for the contact form. Owns values, validation and
 * submission status; delegates the actual send to `onSubmit(values)` so the
 * transport (Formspree, a serverless function, mailto) is swappable.
 *
 * Two modes with different fields — fund managers raising capital vs.
 * investors registering interest — sharing one status/error/submit flow
 * rather than being two separate hooks, since only the field set and
 * validation differ.
 *
 * status: 'idle' | 'submitting' | 'success' | 'error'
 */
export function useContactForm({ onSubmit } = {}) {
  const [mode, setMode] = useState('raising');
  const [values, setValues] = useState(initialValuesByMode.raising);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  function switchMode(nextMode) {
    setMode(nextMode);
    setValues(initialValuesByMode[nextMode]);
    setStatus('idle');
    setError(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setError(null);
    }
  }

  function validate() {
    if (!values.name.trim()) return 'Please add your name.';
    if (!EMAIL.test(values.email)) return 'Please add a valid email address.';
    if (mode === 'raising' && !values.message.trim()) return 'Please add a short message.';
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      setStatus('error');
      return;
    }

    setError(null);
    setStatus('submitting');
    try {
      if (onSubmit) await onSubmit({ ...values, mode });
      setStatus('success');
      setValues(initialValuesByMode[mode]);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return { mode, switchMode, values, status, error, handleChange, handleSubmit };
}
