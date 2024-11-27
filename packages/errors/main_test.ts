import { assertThrows } from "@std/assert";
import { assert, raise } from "./main.ts";

Deno.test("assert", () => {
  assert(true, "this should not throw");
  assertThrows(() => assert(false, "this should throw"));
});

Deno.test("raise", () => {
  assertThrows(() => raise());
  assertThrows(() => raise("Custom error message"));
});
