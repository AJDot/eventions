class EventType
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  field :title, type: String, default: 'Untitled Event Type'

  belongs_to :owner, class_name: User.name

  embeds_many :event_fields
  accepts_nested_attributes_for :event_fields

  has_many :events

  def as_json(options = {})
    attrs = super(options)
    attrs["event_fields"] = event_fields.as_json
    attrs
  end
end