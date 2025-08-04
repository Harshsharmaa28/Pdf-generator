'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { generatePDF } from '@/lib/pdfUtils';
import { FormData } from '@/types/form';
import { FaDownload } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

export default function PDFPreview() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const data: FormData = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    position: searchParams.get('position') || '',
    description: searchParams.get('description') || '',
  };

  const goBack = () => {
    const query = new URLSearchParams(data as any).toString();
    router.push(`/?${query}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 py-6 bg-gray-50">
      
      <div
        className=" mb-4 self-start cursor-pointer text-gray-700 hover:text-black"
        onClick={goBack}
      >
        <IoIosArrowBack className='text-3xl' />
      </div>
      
      <div className="bg-white w-full md:w-[40%] p-6 sm:p-10 rounded border shadow">
        <Row label="Name:" value={data.name} />
        <Row label="Email:" value={data.email} />
        <Row label="Phone Number:" value={data.phone} />
        <Row label="Position:" value={data.position} />
        <Row label="Description:" value={data.description} multiline />
      </div>
      
      <button
        onClick={() => generatePDF(data)}
        className="mt-6 sm:w-auto px-6 py-2 md:px-10 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-md shadow hover:opacity-90"
      >
        <FaDownload />
        Download PDF
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div
      className={`flex ${
        multiline ? 'flex-col sm:flex-row items-start' : 'flex-col sm:flex-row'
      } gap-1 sm:gap-5 mb-4 text-sm sm:text-base`}
    >
      <span className="font-bold min-w-[130px]">{label}</span>
      <span className="text-gray-700 whitespace-pre-line">{value}</span>
    </div>
  );
}
