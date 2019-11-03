export class FixedTableRow<T> {
  key: string;
  items: T[];
  constructor(key: string, items: T[]) {
    this.key = key;
    this.items = items;
  }
}