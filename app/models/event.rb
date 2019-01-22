class Event
  include Mongoid::Document
  include Mongoid::Timestamps::Short
  include Mongoid::Attributes::Dynamic

  belongs_to :owner, class_name: User.name
  belongs_to :event_type

  delegate :title, to: :event_type
end