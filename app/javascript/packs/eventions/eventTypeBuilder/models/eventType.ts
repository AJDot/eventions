import Model from "../../../common/models/model";

export default class EventType extends Model {
  name: string;
  saveTimer: number;
  except: string[] = ['except', 'parent', 'store'];

  get hasChanged(): boolean {
    return this._hasChanged;
  }

  set hasChanged(newVal) {
    if (newVal) {
      this.queueUpdate();
    }
    this._hasChanged = newVal;
  }

  queueUpdate() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }
    this.saveTimer = setTimeout(() => {
      this.save();
    }, window.AppConfig.saveTimeout());
  }

  save() {
    if (this.store) {
      this.store.dispatch('eventTypeStore/update', {eventType: this}).then(() => {

      });
    }
  }

  get defaultName(): string {
    return 'Untitled Event Type';
  }

  get displayName(): string {
    return this.name || this.defaultName;
  }
}