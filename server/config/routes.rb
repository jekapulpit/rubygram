Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v4 do
      resources :rooms
      resources :invites
      resources :messages
      resource :auth, only: %i[create]
      post '/rooms/unreaded/:id', to: 'rooms#read_all'
      get '/users/search', to: 'search#find_users'
    end
  end

  mount ActionCable.server => '/cable'

end
