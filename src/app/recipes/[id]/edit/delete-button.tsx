"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteRecipe } from "../actions";
import { ConfirmDialog } from "@/app/confirm-dialog";

export function DeleteButton({ recipeId }: { recipeId: string}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    await deleteRecipe(recipeId);
    router.push("/recipes");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-stone-500 hover:text-crimson dark:hover:text-cyan"
      >
        Recept verwijderen
      </button>

      <ConfirmDialog
        open={open}
        title="Recept verwijderen"
        message="Weet je zeker dat je dit recept wilt verwijderen? Dit kan niet ongedaan worden gemaakt."
        confirmLabel="Verwijderen"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        confirming={deleting}
      />
    </>
  );
}
