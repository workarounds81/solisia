import { useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValuesByMode = {
  investor: { name: '', email: '', ticketSize: '', sectors: '' },
  holdco: { name: '', email: '', firm: '', message: '' },
};

/**
 * Minimal form state for the contact form. Owns values, validation and
 * submission status; delegates the actual send to `onSubmit(values)` so the
 * transport (Formspree, a serverless function, mailto) is swappable.
 *
 * Two modes with different fields (investors registering interest, and
 * HoldCo deck requests) sharing one status/error/submit flow rather than
 * being separate hooks, since only the field set differs.
 *
 * status: 'idle' | 'submitting' | 'success' | 'error'
 */
export function useContactForm({ onSubmit } = {}) {
  const [mode, setMode] = useState('investor');
  const [values, setValues] = useState(initialValuesByMode.investor);
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
