"use client";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="py-2">
      <h1 className="text-headingColor mb-1 text-2xl font-bold md:text-3xl">
        {title}
      </h1>
      <p className="text-sm text-[#666666] sm:text-base md:text-[16px]">
        {description}
      </p>
    </div>
  );
}
