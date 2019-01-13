class DashboardsController < ApplicationController
  authorize_resource class: User.name
  def show
  end
end