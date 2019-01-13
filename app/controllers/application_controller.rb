class ApplicationController < ActionController::Base
  check_authorization unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden }
      format.html {
        if user_signed_in?
          redirect_to root_path, alert: "Not authorized to view this page."
        else
          redirect_to new_user_session_path
        end
      }
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :organization_id, :membership_id])
  end

  protected

  def current_ability
    @current_ability ||= Object.const_get("#{controller_name.classify}Ability").new(current_user)
  end
end
