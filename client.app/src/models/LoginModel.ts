export default interface LoginModel {
  email: string;
  password: string;
}

export function emailErrorMessages(type?: string) {
  switch (type) {
    case "required":
      return "Email is required";
    case 'validEmail':
      return 'Invalid email address';
    default:
      return "Unknown error";
  }
}

export function passwordErrorMessagesFactory(name: string) {
  return function passwordErrorMessages(type?: string) {
    switch (type) {
      case 'required':
        return `${name} is required`;
      case 'longEnough':
        return `${name} must be longer`
      case 'equalToPassword':
        return `It does not match password`
      default:
        return `Unknown error`;
    }
  }
}
