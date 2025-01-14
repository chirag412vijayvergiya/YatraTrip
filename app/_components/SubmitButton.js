"use client";
import { useFormStatus } from "react-dom";
function SubmitButton({ children, PendingLabel }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 md:px-8 px-4 md:py-4 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? PendingLabel : children}
    </button>
  );
}

export default SubmitButton;
