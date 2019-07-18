Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v4 do
      resources :rooms
      resources :invites
      resources :messages
      resources :users, only: %[update show]
      resource :auth, only: %i[create]
      post '/rooms/unread/:id', to: 'rooms#read_all'
      delete '/rooms/:id/unsubscribe', to: 'rooms#unsubscribe'
      put '/invites/accept/:id', to: 'invites#accept'
      put '/invites/reject/:id', to: 'invites#reject'
      put '/users/:id', to: 'users#update'
      get '/users/:id', to: 'users#show'
      get '/users/search', to: 'search#find_users'
      get '/search/messages', to: 'search#find_messages'
      get '/search/:room_id/messages/', to: 'search#find_messages_in_room'
      get '/auth/sync', to: 'auths#sync'
    end
  end

  mount ActionCable.server => '/cable'

end
