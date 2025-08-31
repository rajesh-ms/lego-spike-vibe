// Shared database helper types

export interface DbResult<T = unknown> {
  recordset: T[];
}

// Inputs that our app passes around for queries/procedures
export type QueryInputs = {
  // Common filters
  id?: number;
  meeting_id?: number;
  user_id?: number;

  // Meeting fields
  title?: string;
  description?: string;
  meeting_date?: Date;
  duration_minutes?: number;
  location?: string;
  agenda?: string;
  created_by?: number;
  status?: string;

  // Learning entry fields
  entry_type?: string;
  content?: string;
};
