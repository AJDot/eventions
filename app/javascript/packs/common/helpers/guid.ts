export default class Guid {

  static create() {
    return this.s4() + this.s4() + '_' + this.s4() + '_' + this.s4() + '_' + this.s4() + '_' + this.s4() + this.s4() + this.s4();
  }

  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}