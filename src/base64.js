class RecursiveBase64 {
  constructor() {
    this.input = document.getElementById('base64-input');
    this.output = document.getElementById('base64-output');

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput() {
    const { value } = this.input;
    const result = this.useRecursive(
      this.convertBase64ToAscii,
      value,
    );
    this.output.value = result;
  }

  addEventListener() {
    this.input.addEventListener(
      'keydown',
      this.onChangeInput,
    );
  }

  validateBase64(value) {
    const length = value.length;
    if (length < 2) {
      throw new Error('InvalidLengthError: string is to short');
    }
    const pad = length % 4;
    if (pad) {
      if (pad === 1) {
        throw new Error('InvalidLengthError: Incorrect padding');
      }
      input += new Array(5 - pad).join('=');
    }
  }

  convertBase64ToAscii(value) {
    value = value
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .trim();
    validateBase64(value);
    return decodeURIComponent(window.atob(value).split('').map((char) => {
      return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  useRecursive(callback, value) {
    let currentValue = value;
    while (1) {
      try {
        currentValue = callback(currentValue);
      } catch {
        return currentValue;
      }
    }
  }
}
