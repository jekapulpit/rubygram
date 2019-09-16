# frozen_string_literal: true

module Invites
  class AcceptService < AnswerService
    def call
      if @invite.accept
        send_notifications
        return true
      end
      false
    end

    def send_notifications
      super
      room = @invite.room
      message = Message.new(
        content: "user #{@invite.user.username} joined the conversation",
        sender: room,
        recipient: room
      )
      message.save
      RoomsChannel.broadcast_to room,
                                message: message,
                                type: 'RECEIVE_MESSAGE'
    end
  end
end
