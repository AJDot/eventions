class EventTypesController < ApplicationController
  load_and_authorize_resource
  layout :get_layout

  def index
    @event_types = current_user.event_types
  end

  def new
    @event_type.assign_attributes(owner: current_user)
    @event_type.save
    redirect_to edit_event_type_path(@event_type)
  end

  def edit
    @event_type_as_json = @event_type.as_json
    @user_as_json = current_user.as_json
  end

  def update
    render json: {success: @event_type.update(update_params), event_type: @event_type.as_json}
  end

  private

  def event_type_params
    params.require(:event_type).permit(
        :id,
        :name
    )
  end

  def update_params
    event_type_params
  end

  def get_layout
    case action_name
    when 'edit'
      'event_type_builder'
    else
      'application'
    end
  end
end