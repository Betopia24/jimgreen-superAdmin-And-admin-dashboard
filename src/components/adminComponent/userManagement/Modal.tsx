"use client";
import { ShieldAlert, Wheat, WheatIcon } from "lucide-react";
import React from "react";

/* ===== Props Type ===== */
interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <ShieldAlert />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold">Deactivate User?</h2>

        {/* Description */}
        <p className="mt-2 text-center text-sm text-gray-600">
          This user will lose access to the platform immediately.
          <br />
          This action can be reversed later.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
