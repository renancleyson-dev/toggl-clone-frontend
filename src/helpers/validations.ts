const genericMessages = {
  required: 'Este campo deve ser preenchido',
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
