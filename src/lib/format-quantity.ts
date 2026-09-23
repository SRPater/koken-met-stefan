const FRACTIONS: [number, string][] = [
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [1 / 2, "½"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
];

function formatNumber(n: number): string {
  const whole = Math.floor(n);
  const frac = n - whole;

  for (const [value, symbol] of FRACTIONS) {
    if (Math.abs(frac - value) < 0.02) {
      return whole > 0 ? `${whole}${symbol}` : symbol;
    }
  }

  if (frac < 0.02) {
    return `${whole}`;
  }

  return (Math.round(n * 100) / 100).toString().replace(".", ",");
}

export function formatQuantity(
  quantity: number | null,
  quantityMax: number | null,
  scale: number,
): string | null {
  if (quantity === null) return null;
  
  const scaled = formatNumber(quantity * scale);
  if (quantityMax !== null) {
    return `${scaled}-${formatNumber(quantityMax * scale)}`;
  }
  return scaled;
}
