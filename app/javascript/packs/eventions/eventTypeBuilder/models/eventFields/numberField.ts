import EventField from "./eventField";
import {EventFieldType} from "../../enums/eventFieldType";

export default class NumberField extends EventField {
  label: string = 'Untitled Number Field';
  _type: EventFieldType = EventFieldType.number;
}