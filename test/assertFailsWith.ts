import { assertEquals, fail } from 'https://deno.land/std/testing/asserts.ts';

export function assertFailsWith (command: () => any, tryMessage: string, catchMessage: string) {
  try {
    command();
    fail(tryMessage);
  } catch (error) {
    assertEquals((error as Error).message, catchMessage);
  }
}
