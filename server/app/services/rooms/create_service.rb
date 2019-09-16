# frozen_string_literal: true

module Rooms
  class CreateService
    attr_reader :name, :creator, :user_list

    def initialize(name, creator, _user_list = nil)
      @name = name
      @creator = creator
    end

    def call
      room = Room.new(name: name)
      room.creator = creator
      room.save
      RoomRelation.create(user: creator, room: room, status: 'creator')
      room
    end
  end
end
