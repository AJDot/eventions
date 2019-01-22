class EventsController < ApplicationController
  load_and_authorize_resource

  def new
    @event
  end

  def create
    @event.owner = current_user
    if @event.save
      redirect_to event_path(@event), notice: "Event #{@event.title} was created."
    else
      render :new
    end
  end

  def show

  end

  def edit

  end

  def update
    if @event.update(update_params)
      redirect_to event_path(@event), notice: "Event #{@event.title} was updated."
    else
      render :edit
    end

  end

  private

  def event_params
    params.require(:event).permit(
        :id,
        :event_type_id,
        :title
    )
  end

  def new_params
    params.require(:event).permit!
  end

  def create_params
    new_params
  end

  def update_params
    new_params
  end
end