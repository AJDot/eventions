class EventFields::TextField < EventField
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  def get_type
    EventFieldType.Text
  end
end