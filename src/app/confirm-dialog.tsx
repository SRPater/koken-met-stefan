"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirming?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Bevestigen",
  cancelLabel = "Annuleren",
  onConfirm,
  onCancel,
  confirming = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-stone-900">
        <h2 className="font-gaegu text-xl text-stone-800 dark:text-stone-200">
          {title}
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirming}
            className="rounded bg-crimson px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-cyan dark:text-stone-950"
          >
            {confirming ? "Bezig..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
