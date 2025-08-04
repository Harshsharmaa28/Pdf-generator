'use client';
import FormPage from '@/components/Form';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormPage />
    </Suspense>
  );
}
