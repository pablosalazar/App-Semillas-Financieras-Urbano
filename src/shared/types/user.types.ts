import type { DOCUMENT_TYPES_VALUES } from "../constants";

type DocumentType = (typeof DOCUMENT_TYPES_VALUES)[number];

export interface User {
  firstname: string;
  lastname: string;
  documentType: DocumentType;
  documentNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
