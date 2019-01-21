class EventFields::NumberField < EventField
  include Mongoid::Document
  include Mongoid::Timestamps::Short
  def get_type
    EventFieldType.Number
  end
end
