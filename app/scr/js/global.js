function safeDecorator(fn) {
  // eslint-disable-next-line func-names
  return function(...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.message.includes('has already been used with this registry')
      ) {
        return false;
      }
      throw error;
    }
  };
}

customElements.define = safeDecorator(customElements.define);