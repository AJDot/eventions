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
    render json: {success: @event_type.update_attributes(update_params), event_type: @event_type.as_json}
  end

  def destroy
    @event_type.destroy
    redirect_to event_types_path, notice: "#{@event_type.name} was deleted successfully."
  end

  private

  def event_type_params
    p = params.require(:event_type).permit(
        :id,
        :title,
        {
            event_fields_attributes: [
                :id,
                :label,
                :_type
            ]
        }
    )
    if p[:event_fields_attributes].present?
      p[:event_fields_attributes].each do |k, v|
        v[:_type] = EventField.get_class(v[:_type])
      end
    end
    p
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