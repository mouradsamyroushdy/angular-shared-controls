import { RowSchemaType, FieldType } from "@shared/enums";

export class RowSchema {
  id: number;
  collapsible?: boolean | null = false;
  title?: string | null;
  rowType?: RowSchemaType | null = RowSchemaType.Child;
  groups?: RowSchema[][] | null;
  fieldType?: FieldType | null;
  field?: string | null;
  template?: string | null;
}

