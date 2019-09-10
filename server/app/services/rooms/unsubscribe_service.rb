module Rooms
  class UnsubscribeService
    attr_reader :room, :user

    def initialize(room_id, user_id)
      @room = Room.find(room_id)
      @user = User.find(user_id)
    end

    def call
      relation = RoomRelation.find_by(room: room, user: user)
      invite = Invite.find_by(room: room, user: user)
      invite.destroy if invite
      message = Message.new(
          content: "user #{user.username} left the conversation",
          sender: room,
          recipient: room
      )
      message.save
      RoomsChannel.broadcast_to room, {
          message: message,
          type: 'RECEIVE_MESSAGE'
      }
      relation.destroy
    end
  end
end