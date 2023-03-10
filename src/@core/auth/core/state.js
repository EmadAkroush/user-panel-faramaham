export default class State {
  constructor(store) {
    this.$store = store;
  }
  setState(key, value) {
    this.$store.commit('AUTH/SET', {
      key,
      value,
    });

    return value;
  }
}
