function parseSingle(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;

  // mixed number, e.g. "1 1/2"
  const mixed = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    const [, whole, num, den] = mixed;
    return Number(whole) + Number(num) / Number(den);
  }

  // simple fraction, e.g. "1/2"
  const fraction = trimmed.match(/^(\d+)\/(\d+)$/);
  if (fraction) {
    const [, num, den] = fraction;
    return Number(num) / Number(den);
  }

  // plain number, accepting a Dutch comma or an English dot
  const numeric = Number(trimmed.replace(",", "."));
  return Number.isNaN(numeric) ? null: numeric;
}

export function parseQuantity(input: string): {
  quantity: number | null;
  quantityMax: number | null;
} {
  const trimmed = input.trim();
  if (trimmed === "") {
    return { quantity: null, quantityMax: null };
  }

  const parts = trimmed.split(/\s*-\s*/);
  if (parts.length === 2) {
    return {
      quantity: parseSingle(parts[0]),
      quantityMax: parseSingle(parts[1]),
    };
  }

  return { quantity: parseSingle(trimmed), quantityMax: null };
}