export const DOCUMENT_TYPES_VALUES = ["CC", "TI", "CE", "PP"] as const;

export const DOCUMENT_TYPES = [
  { value: "CC" as const, label: "Cédula de Ciudadanía (C.C)" },
  { value: "TI" as const, label: "Tarjeta de Identidad (T.I)" },
  { value: "CE" as const, label: "Cédula de Extranjería (C.E)" },
  { value: "PP" as const, label: "Pasaporte" },
];
