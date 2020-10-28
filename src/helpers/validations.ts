const genericMessages = {
  required: 'Required',
};

export const requiredField = (
  field: unknown,
  name: string,
  errors: { [key: string]: string },
  message = genericMessages.required
) => {
  if (!field) {
    errors[name] = message;
  }
};
