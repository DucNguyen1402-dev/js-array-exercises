export const validationTheme = {
  warning: ['ring-2', 'ring-yellow-500'],

  error: ['ring-2', 'ring-rose-500'],
};

export const mapVariantToTheme = (variant) => {
  return validationTheme[variant];
};

export const getAllVariantTheme = () =>
  Object.values(validationTheme).flat();

export const severityToVariant = {
  warning: 'warning',
  error: 'danger',
  critical: 'danger',
};

export const mapSeverityToVariant = (severity) => {
  return severityToVariant[severity] ?? 'info';
};
