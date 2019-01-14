const trackable = (function () {
  function trackChange(key: string, oldVal: any, newVal: any): void {
    let keyChanges = this._changes[key];
    if (keyChanges) {
      keyChanges.newVal = newVal;
    } else {
      this._changes[key] = {oldVal: oldVal, newVal: newVal, object: this};
    }
    this.hasChanged = true;
  }

  return function trackable () {
    this._changes = {};
    this.trackChange = trackChange;
  }
}());

export default trackable
