import { ValueTransformer } from 'typeorm';
export class StringToJsonTransformer implements ValueTransformer {
  // To db from src
  public to(value: string | object | null): string | null {
    if (value === null) {
      return null;
    }
    return JSON.stringify(value);
  }
  // From db to src
  public from(value: string): string | object | null {
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  }
}
