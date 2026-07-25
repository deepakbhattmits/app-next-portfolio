/** @format */

export const firstCharCaps = (data: string) => {
  if (!data) return '';
  // Remove empty spaces from edges
  const cleaned = data.trim();

  // Capitalize character 0, and force the remaining string to lowercase
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}
