class EventField
  include Mongoid::Document
  include Mongoid::Timestamps::Short
  include CustomIdable

  embedded_in :event_type

  field :label, type: String

  def self.get_class(type)
    case type.to_i
    when EventFieldType.Text
      EventFields::TextField
    when EventFieldType.Number
      EventFields::NumberField
    else
      nil
    end
  end

  def get_type
    nil
  end

  def as_json(options = {})
    options[:except] ||= []
    options[:except] << :_type
    attrs = super(options)
    attrs[:_type] = get_type
    attrs
  end
end