import {EventFieldType} from "../../enums/eventFieldType";
import NumberField from "./numberField";
import TextField from "./textField";

export default class EventFieldFactory {
  static create(eventFieldType: EventFieldType) {
    switch (eventFieldType) {
      case EventFieldType.text:
        return new TextField();
      case EventFieldType.number:
        return new NumberField();
      default:
        throw new Error(`EventFieldType ${eventFieldType} does not exist.`);
    }
  }
}