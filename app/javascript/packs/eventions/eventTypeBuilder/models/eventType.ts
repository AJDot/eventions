import Model from "../../../common/models/model";
import EventField from "./eventFields/eventField";
import EventFieldFactory from "./eventFields/eventFieldFactory";

export default class EventType extends Model {
  title: string;
  saveTimer: number;
  except: string[] = ['except', 'parent', 'store'];
  event_fields: EventField[] = [];

  constructor() {
    super()
    this.defineProperty('title', '', false);
  }

  get EMBEDDED_MODELS(): {[key: string]: Function} {
    return {event_fields: (parent, json) => EventFieldFactory.create(parent, json._type, false)};
  }

  // ****************************** Track Changes ******************************
  get hasChanged(): boolean {
    return this._hasChanged;
  }

  set hasChanged(newVal) {
    if (newVal) {
      this.queueUpdate();
    }
    this._hasChanged = newVal;
  }
  // ****************************** Track Changes End ******************************

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

  get defaultTitle(): string {
    return 'Untitled Event Type';
  }

  get displayTitle(): string {
    return this.title || this.defaultTitle;
  }
}