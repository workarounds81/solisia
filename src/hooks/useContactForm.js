import { useState } from 'react';

const initialValues = { name: '', email: '', message: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Minimal form state for the contact form. Owns values, validation and
 * submission status; delegates the actual send to `onSubmit(values)` so the
 * transport (Formspree, a serverless function, mailto) is swappable.
 *
 * status: 'idle' | 'submitting' | 'success' | 'error'
 */
export function useContactForm({ onSubmit } = {}) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

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
    if (!values.message.trim()) return 'Please add a short message.';
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
      if (onSubmit) await onSubmit(values);
      setStatus('success');
      setValues(initialValues);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return { values, status, error, handleChange, handleSubmit };
}
