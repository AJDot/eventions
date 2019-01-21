import EventField from "./eventField";
import {EventFieldType} from "../../enums/eventFieldType";

export default class TextField extends EventField {
  id: string;
  label: string = 'Untitled Text Field';
  _type: EventFieldType = EventFieldType.text;
}