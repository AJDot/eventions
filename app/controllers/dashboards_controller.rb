class DashboardsController < ApplicationController
  authorize_resource class: User.name
  def show
    @events = current_user.events
  end
end