module Invites
  class CreateService
    attr_reader :content, :invite_type, :room, :user

    def initialize(content, user_id, room_id = nil, invite_type = 0)
      @content = content
      @invite_type = invite_type
      @room = room_id
      @user = user_id
    end

    def call
      Invite.new(content: content, invite_type: invite_type, room_id: room, user_id: user) unless Invite.find_by(room_id: room, user_id: user)
    end
  end
end