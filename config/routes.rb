Rails.application.routes.draw do
  devise_for :users
  root controller: :dashboards, action: :show

  resources :event_types, only: [:index, :new, :edit, :update, :destroy]
  resources :events, only: [:new, :create, :show]
end
