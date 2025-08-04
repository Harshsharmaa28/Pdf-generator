"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, FormData } from '@/lib/validation';
import { useRouter, useSearchParams } from "next/navigation";
import { generatePDF } from "@/lib/pdfUtils";
import { useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";

export default function FormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const values: Partial<FormData> = {
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
      position: searchParams.get("position") || "",
      description: searchParams.get("description") || "",
    };
    reset(values);
  }, [searchParams, reset]);

  const onViewPDF = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    const values = getValues();
    const queryParams = Object.entries(values)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>);

    router.push(`/preview?${new URLSearchParams(queryParams).toString()}`);

  };

  const onDownloadPDF = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    const values = getValues();
    generatePDF(values);
  };

  const Field = ({
    icon,
    label,
    placeholder,
    registerKey,
    type = "text",
  }: {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    registerKey: keyof FormData;
    type?: string;
  }) => (
    <div className="flex items-start gap-3 p-4 bg-white inset-shadow-xs shadow-md rounded-xl">
      <div className="mt-1 text-gray-600">{icon}</div>
      <div className="flex flex-col w-full">
        <label className="font-semibold text-sm">{label}</label>
        <input
          {...register(registerKey)}
          type={type}
          placeholder={placeholder}
          className="outline-none text-sm placeholder-gray-400"
        />
        {errors[registerKey] && (
          <p className="text-red-500 text-xs mt-1">
            {(errors[registerKey] as any).message}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Add Your details</h1>
      <form className="space-y-4">
        <Field
          icon={<FaUser />}
          label="Name"
          placeholder="e.g. John Doe"
          registerKey="name"
        />
        <Field
          icon={<FaEnvelope />}
          label="Email"
          placeholder="e.g. Johndoe@gmail.com"
          registerKey="email"
        />
        <Field
          icon={<FaPhone />}
          label="Phone Number"
          placeholder="e.g. (220) 222 -20002"
          registerKey="phone"
        />
        <Field
          icon={<FaBriefcase />}
          label="Position"
          placeholder="e.g. Junior Front end Developer"
          registerKey="position"
        />
        <Field
          icon={<FaFileAlt />}
          label="Description"
          placeholder="e.g. Work experiences"
          registerKey="description"
        />

        <div className="flex w-full gap-4 justify-center mt-6">
          <button
            type="button"
            onClick={onViewPDF}
            className="flex items-center w-full cursor-pointer justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold p-1 sm:py-2 sm:px-12 rounded-md shadow hover:opacity-90"
          >
            View PDF
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            className="flex items-center w-full cursor-pointer justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold p-1 sm:py-2 sm:px-12 rounded-md shadow hover:opacity-90"
          >
            <FaDownload />
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
}
