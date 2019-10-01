# frozen_string_literal: true

module Invites
  class CreateService
    attr_reader :content, :invite_type, :room, :user

    def initialize(content, user_id, room_id = nil, invite_type = 0)
      @content = content
      @invite_type = invite_type
      @room = Room.find(room_id)
      @user = User.find(user_id)
      @invite = Invite.new
    end

    def call
      unless unable_to_invite || user.ignoring?(room.creator)
        user.update(unread_notifications: (user.unread_notifications + 1))
        @invite = Invite.create(content: content, invite_type: invite_type, room: room, user: user)
        send_notification
      end
      @invite
    end

    def unable_to_invite
      (Invite.find_by(room: room, user: user) || room.empty_slots <= 0) && !room.creator.admin?
    end

    def send_notification
      if @invite.valid?
        NotificationsChannel.broadcast_to 'notifications_channel',
                                          invite: @invite,
                                          type: 'RECEIVE_INVITE'
      end
    end
  end
end
