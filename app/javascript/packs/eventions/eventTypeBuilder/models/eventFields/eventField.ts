import Model from "../../../../common/models/model";
import {EventFieldType} from "../../enums/eventFieldType";

export default class EventField extends Model {
  label: string = 'Untitled Event Field';
  _type: number;
  include = ['_type'];
  hasChanged: boolean;

  constructor() {
    super();
    this.defineProperty('label', '');
  }

  get fieldTypeDisplayName(): string {
    return EventFieldType[this._type];
  }
}