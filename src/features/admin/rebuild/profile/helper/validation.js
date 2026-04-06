/**
 * Format Zod validation errors to object format
 * @param {Array} issues - Zod error issues
 * @returns {Object} Formatted errors object
 */
export const formatZodErrors = (issues) => {
  const formatted = {};

  issues.forEach((issue) => {
    const field = issue.path[0];
    if (field) {
      formatted[field] = issue.message;
    }
  });

  return formatted;
};

/**
 * Validate form data using Zod schema
 * @param {import("zod").ZodSchema} schema - Zod schema
 * @param {Object} data - Form data to validate
 * @returns {Object} { success: boolean, errors: Object, data?: Object }
 */
export const validateForm = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error.issues),
    };
  }

  return {
    success: true,
    errors: {},
    data: result.data,
  };
};

