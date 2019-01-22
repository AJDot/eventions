class EventAbility
  include CanCan::Ability

  def initialize(user)
    return if user.nil?
    can [:new, :create, :show, :edit, :update], Event
  end
end
