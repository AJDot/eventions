class EventFieldFactory
  def self.create(eventFieldType)
    case eventFieldType
    when EventFieldType.Text
      EventFields::TextField.new
    when EventFieldType.Number
      EventFields::NumberField.new
    else
      nil
    end
  end
end