class DashboardAbility
  include CanCan::Ability

  def initialize(user)
    return if user.nil?
    # can do any dashboard action if user exists
    can :manage, User
  end
end
