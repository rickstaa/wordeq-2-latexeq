/**
 * @file Test helper functions.
 */
import { REGEXES, REPLACESTRINGS } from "./App";
import { multiRegex } from "./helpers";

test("should strips unwanted regex", () => {
  const str = "\\mathbit{x}*\\mathbf{y}";
  const result = multiRegex(str, REGEXES, REPLACESTRINGS);
  expect(result).toBe(" x * y ");
});
