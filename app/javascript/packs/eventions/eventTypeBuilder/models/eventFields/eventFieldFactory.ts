import {EventFieldType} from "../../enums/eventFieldType";
import NumberField from "./numberField";
import TextField from "./textField";
import EventType from "../eventType";

export default class EventFieldFactory {
  static create(parent: EventType, eventFieldType: EventFieldType, trackCreation = true) {
    let field = (function() {
      switch (eventFieldType) {
        case EventFieldType.text:
          return new TextField();
        case EventFieldType.number:
          return new NumberField();
        default:
          throw new Error(`EventFieldType ${eventFieldType} does not exist.`);
      }
    }());
    field.parent = parent;
    if (trackCreation) {
      field.hasChanged = true;
    }
    return field;
  }
}