class EventType
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  field :name, type: String, default: 'Untitled Event Type'

  belongs_to :owner, class_name: User.name
end