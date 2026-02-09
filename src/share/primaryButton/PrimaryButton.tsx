import React from "react";
import { LuLoader } from "react-icons/lu";

interface PrimaryButtonProps {
  text?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string; // ✅ allow custom class
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  children,
  loading = false,
  type = "button",
  disabled = false,
  className = "", // default empty
}) => {
  // If children exist → render as div button
  if (children) {
    return (
      <div
        role="button"
        aria-disabled={loading || disabled}
        onClick={!loading && !disabled ? onClick : undefined}
        className={`cursor-pointer rounded-md bg-primary/80 px-2 py-2 text-center text-white shadow transition-all duration-300 hover:bg-primary ${loading || disabled ? "cursor-not-allowed opacity-60" : ""} ${className} // ✅ custom classes applied`}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`bg-primaryColor hover:bg-primaryColor flex items-center justify-center gap-2 rounded-[8px] px-3 py-2 text-white shadow transition-all duration-300 ${loading || disabled ? "cursor-not-allowed opacity-70" : ""} ${className} // ✅ custom classes applied`}
    >
      {loading && <LuLoader className="animate-spin" />}
      <span>{text}</span>
    </button>
  );
};

export default PrimaryButton;
