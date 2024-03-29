# frozen_string_literal: true

module Invites
  class CreateService
    attr_reader :content, :invite_type, :room, :user

    def initialize(content, user_id, room_id = nil, invite_type = 0)
      @content = content
      @invite_type = invite_type
      @room = Room.find(room_id)
      @user = User.find(user_id)
    end

    def call
      user.update(unread_notifications: (user.unread_notifications + 1)) unless unable_to_invite || user.ignoring?(room.creator)
      Invite.create(content: content, invite_type: invite_type, room: room, user: user) unless unable_to_invite || user.ignoring?(room.creator)
    end

    def unable_to_invite
      (Invite.find_by(room: room, user: user) || room.empty_slots <= 0) && !room.creator.admin?
    end
  end
end
