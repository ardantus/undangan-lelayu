import { customAlphabet } from "nanoid";

const letters = customAlphabet("abcdefghijklmnopqrstuvwxyz", 1);
const digits = customAlphabet("0123456789", 1);

export function generateId(): string {
  const part1 = letters() + digits() + letters() + digits();
  const part2 = letters() + digits() + letters() + digits();
  return `${part1}-${part2}`;
}
