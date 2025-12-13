/**
 * Systematic Approach to Fixing "Expression expected" Syntax Errors
 *
 * This error occurs when React-SWC reports "Expression expected" at a closing );
 * but the real issue is earlier in the code. Common causes:
 *
 * 1. Missing opening parenthesis in function calls
 * 2. Missing commas between function arguments
 * 3. Unclosed brackets/braces in previous code blocks
 * 4. Malformed conditional expressions
 *
 * Systematic Debugging Steps:
 *
 * Step 1: Identify the problematic line
 * - Look at the line number reported by SWC (e.g., line 885)
 * - Check the closing ); and work backwards
 *
 * Step 2: Check for missing function call openers
 * - Look for argument patterns that should be inside functions
 * - Common patterns: variable !== undefined && array ? array[variable] : 'default'
 *
 * Step 3: Validate bracket/brace balance
 * - Count opening and closing brackets above the error line
 * - Ensure all {, [, ( have matching }, ], )
 *
 * Step 4: Check argument separation
 * - Ensure commas separate function arguments properly
 * - Look for missing commas between complex expressions
 *
 * Step 5: Validate conditional expressions
 * - Ensure ternary operators (? :) are properly formed
 * - Check that all conditions have both true and false branches
 *
 * Prevention Strategies:
 *
 * 1. Use ESLint with rules:
 *    - @typescript-eslint/no-unused-vars
 *    - @typescript-eslint/no-explicit-any
 *    - @typescript-eslint/explicit-function-return-type
 *
 * 2. Enable TypeScript strict mode
 * 3. Use Prettier for consistent formatting
 * 4. Regular code reviews focusing on syntax patterns
 *
 * Example Error Pattern:
 * ❌ Wrong:
 *   someFunction
 *     argument1,
 *     argument2
 *   );
 *
 * ✅ Correct:
 *   someFunction(
 *     argument1,
 *     argument2
 *   );
 */

/**
 * Development-time validation utility for function calls
 * This can help catch malformed function calls during development
 */
export const validateFunctionCall = (fn: Function, ...args: any[]) => {
  try {
    // Basic validation that function exists and is callable
    if (typeof fn !== 'function') {
      console.error('validateFunctionCall: First argument must be a function');
      return false;
    }

    // Check that all arguments are defined (not checking for null/undefined as those might be valid)
    const undefinedArgs = args.filter((arg, index) => arg === undefined && index < fn.length);
    if (undefinedArgs.length > 0) {
      console.warn('validateFunctionCall: Some arguments are undefined:', undefinedArgs);
    }

    return true;
  } catch (error) {
    console.error('validateFunctionCall: Error during validation:', error);
    return false;
  }
};

/**
 * Utility to safely format multi-select answers for tracking
 * Prevents the common error of trying to index arrays with arrays
 */
export const formatMultiSelectAnswer = (
  userAnswer: number[] | undefined,
  options: string[] | undefined
): string => {
  if (!userAnswer || !options) return 'No answer';

  try {
    return userAnswer
      .map(index => options[index])
      .filter(Boolean)
      .join(', ') || 'No answer';
  } catch (error) {
    console.error('formatMultiSelectAnswer: Error formatting answer:', error);
    return 'Error formatting answer';
  }
};

/**
 * Utility to safely format correct answers for tracking
 */
export const formatCorrectAnswer = (
  correctAnswer: number[] | number,
  options: string[] | undefined
): string => {
  if (!options) return '';

  try {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer
        .map(index => options[index])
        .filter(Boolean)
        .join(', ');
    } else {
      return options[correctAnswer] || '';
    }
  } catch (error) {
    console.error('formatCorrectAnswer: Error formatting correct answer:', error);
  return '';
}
}
