Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v4 do
      resources :rooms, only: %i[show index create destroy]
      resources :messages
      post '/rooms/unreaded/:id', to: 'rooms#read_all'
    end
  end

  mount ActionCable.server => '/cable'

end
