'use client';

import { useState } from 'react';
import { createBooking } from '@/lib/api/campers';
import Image from 'next/image';
import css from './BookingForm.module.css';

interface BookingFormProps {
  camperId: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (name: string, email: string): FormErrors => {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!EMAIL_REGEX.test(email.trim())) errors.email = 'Please enter your email.';
  return errors;
};

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(name, email);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('sending');
    try {
      await createBooking(camperId, { name: name.trim(), email: email.trim() });
      setStatus('success');
      setName('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: undefined }));
    setStatus('idle');
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: undefined }));
    setStatus('idle');
  };

  return (
    <div className={css.card}>
      <div className={css.header}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      </div>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.fields}>
          <div className={css.field}>
            <div className={css.inputWrap}>
              {errors.name && <span className={css.floatLabel}>Name*</span>}
              <input
                className={errors.name ? `${css.input} ${css.inputError}` : css.input}
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
              {errors.name && (
                <Image
                  src="/icons/error.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={css.errorIcon}
                />
              )}
            </div>
            {errors.name && <p className={css.errorText}>{errors.name}</p>}
          </div>

          <div className={css.field}>
            <div className={css.inputWrap}>
              {errors.email && <span className={css.floatLabel}>Email*</span>}
              <input
                className={errors.email ? `${css.input} ${css.inputError}` : css.input}
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {errors.email && (
                <Image
                  src="/icons/error.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={css.errorIcon}
                />
              )}
            </div>
            {errors.email && <p className={css.errorText}>{errors.email}</p>}
          </div>
        </div>

        <button className={css.button} type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send'}
        </button>

        {status === 'success' && (
          <p className={css.success}>Thank you! Your booking request has been sent.</p>
        )}
        {status === 'error' && (
          <p className={css.errorText}>Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
