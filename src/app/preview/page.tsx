import { Suspense } from 'react';
import PDFPreview from '@/components/PDFPreview';

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading preview...</div>}>
      <PDFPreview />
    </Suspense>
  );
}
