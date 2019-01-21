class EventTypeAbility
  include CanCan::Ability

  def initialize(user)
    return if user.nil?
    can [:index, :show, :edit, :update, :create, :destroy], EventType
  end
end
