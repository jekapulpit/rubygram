# frozen_string_literal: true

module Messages
  class CreateService
    attr_reader :message, :room

    def initialize(content, room, sender)
      @room = room
      @message = Message.new(content: content, sender: sender, recipient: room)
    end

    def call
      if message.save
        increment_unread
        send_message
      end
      message
    end

    def increment_unread
      room_relations = room.room_relations
      room_relations.update_all('unread_number = unread_number + 1') if room_relations.any?
    end

    def send_message
      RoomsChannel.broadcast_to room,
                                message: message.with_send_info,
                                type: 'RECEIVE_MESSAGE'
    end
  end
end
