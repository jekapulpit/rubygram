Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v4 do
      resources :rooms
      resources :invites
      resources :messages
      resource :auth, only: %i[create]
      post '/rooms/unread/:id', to: 'rooms#read_all'
      delete '/rooms/:id/unsubscribe', to: 'rooms#unsubscribe'
      put '/invites/accept/:id', to: 'invites#accept'
      put '/invites/reject/:id', to: 'invites#reject'
      get '/users/search', to: 'search#find_users'
    end
  end

  mount ActionCable.server => '/cable'

end
