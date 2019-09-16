# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v4 do
      resources :rooms
      resources :invites
      resources :messages
      resources :users, only: %(update show)
      resource :auth, only: %i[create]
      post '/rooms/unread/:id', to: 'rooms#read_all'
      post '/invites/unread/', to: 'invites#read_all'
      delete '/rooms/:id/unsubscribe', to: 'rooms#unsubscribe'
      put '/invites/accept/:id', to: 'invites#accept'
      put '/invites/reject/:id', to: 'invites#reject'
      put '/users/:id', to: 'users#update'
      get '/users/:id', to: 'users#show'
      get '/search/users/', to: 'search#find_users'
      post '/register', to: 'users#create'
      post '/users/:id/settings', to: 'users#set_max_chats'
      post '/users/:id/ignore_by_room', to: 'users#ignore_by_room'
      post '/users/:id/ignore', to: 'users#ignore'
      delete '/users/:id/stop_ignore', to: 'users#stop_ignore'
      put '/settings/users', to: 'users#set_default_max_chats'
      put '/settings/rooms', to: 'rooms#set_default_max_users'
      get '/settings/users/default', to: 'users#get_default_max_chats'
      put '/settings/users/admin/:id', to: 'users#give_permissions'
      get '/settings/rooms/default', to: 'rooms#get_default_max_users'
      post '/rooms/:id/settings', to: 'rooms#set_max_users'
      get '/search/messages', to: 'search#find_messages'
      get '/search/rooms/', to: 'search#find_rooms'
      get '/search/:room_id/messages/', to: 'search#find_messages_in_room'
      get '/auth/sync', to: 'auths#sync'
    end
  end

  mount ActionCable.server => '/cable'
end
