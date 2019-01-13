export default class Service {
  constructor() {
  }

  static csrfToken() {
    let csrf = <any>$('[name="csrf-token"]');
    if (csrf.length > 0) {
      return csrf[0].content;
    }
    return null;
  }

  csrfToken() {
    return Service.csrfToken();
  }
}