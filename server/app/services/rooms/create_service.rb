module Rooms
  class CreateService
    attr_reader :name, :creator, :user_list

    def initialize(name, creator, user_list = nil)
      @name = name
      @creator = creator
    end

    def call
      room = Room.create(name: name)
      RoomRelation.create(user: creator, room: room, status: 'creator')
      room
    end
  end
end