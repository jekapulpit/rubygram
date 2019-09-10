module Invites
  class AcceptService
    attr_reader :invite

    def initialize(invite)
      @invite = invite
    end

    def call
      if @invite.accept
        send_notifications
        return true
      end
      false
    end

    def send_notifications
      room = @invite.room
      RoomsChannel.broadcast_to room, {
          user: @invite.user.with_invited_status(room),
          type: 'ANSWER'
      }
      message = Message.new(
          content: "user #{@invite.user.username} joined the conversation",
          sender: room,
          recipient: room
      )
      message.save
      RoomsChannel.broadcast_to room, {
          message: message,
          type: 'RECEIVE_MESSAGE'
      }
    end
  end
end