/**
 * Helper functions.
 */

/** Applies a list of regex expressions and a replace string to a input string.
 *
 * @param inputString Input string to apply regexes to.
 * @param regexes List of regex expressions to apply.
 * @param replaceStrs Replace strings to use.
 * @returns String with regexes applied.
 */
export const multiRegex = (
  inputString: string | undefined,
  regexes: RegExp[],
  replaceStrs: string[]
) => {
  inputString = inputString === undefined ? "" : inputString;
  let result = inputString;
  for (const [idx, regex] of regexes.entries()) {
    result = result.replace(regex, replaceStrs[idx]) ?? inputString;
  }
  return result;
};

export default multiRegex;
