"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/hubspot";

type Action = (prev: FormState, form: FormData) => Promise<FormState>;

function SubmitButton({ label, className }: { label: string; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={`${className} disabled:opacity-70`}>
      {pending ? "Sending…" : label}
    </button>
  );
}

/** A form that posts to a server action and swaps itself for a thank-you once sent. */
export function FormShell({
  action,
  className,
  labelledBy,
  submitLabel,
  buttonClassName,
  errorClassName = "mt-4 rounded-md bg-clay-soft px-3 py-2 text-sm text-clay-red",
  thanksTitle,
  thanksText,
  thanksTitleClassName = "headline text-4xl",
  children,
}: {
  action: Action;
  className: string;
  labelledBy?: string;
  submitLabel: string;
  buttonClassName: string;
  errorClassName?: string;
  thanksTitle: string;
  thanksText: string;
  thanksTitleClassName?: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, null);

  if (state?.ok) {
    return (
      <div className={className} role="status">
        <p className={thanksTitleClassName}>{thanksTitle}</p>
        <p className="mt-3">{thanksText}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={className} aria-labelledby={labelledBy}>
      {children}
      {/* Left empty by people; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="nickname">Leave this empty</label>
        <input id="nickname" name="nickname" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {state && !state.ok ? (
        <p role="alert" className={errorClassName}>
          {state.error}
        </p>
      ) : null}
      <SubmitButton label={submitLabel} className={buttonClassName} />
    </form>
  );
}
