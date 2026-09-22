export const UNIT_LABELS: Record<
  string,
  { singular: string; plural: string }
> = {
  G: { singular: "gram", plural: "gram" },
  KG: { singular: "kilogram", plural: "kilogram" },
  ML: { singular: "milliliter", plural: "milliliter" },
  L: { singular: "liter", plural: "liter" },
  TSP: { singular: "theelepel", plural: "theelepels" },
  TBSP: { singular: "eetlepel", plural: "eetlepels" },
  CUP: { singular: "kopje", plural: "kopjes" },
  PINCH: { singular: "snufje", plural: "snufjes" },
  PIECE: { singular: "stuk", plural: "stuks" },
};

export const UNIT_OPTIONS = [
  { value: "", label: "geen eenheid" },
  ...Object.entries(UNIT_LABELS).map(([value, { singular }]) => ({
    value,
    label: singular,
  })),
  { value: "CUSTOM", label: "anders..." },
];
