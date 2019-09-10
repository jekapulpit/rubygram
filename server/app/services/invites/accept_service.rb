module Invites
  class AcceptService
    attr_reader :invite

    def initialize(invite)
      @invite = invite
    end

    def call
      room = @invite.room
      if @invite.accept
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
        return true
      end
      false
    end
  end
end