# frozen_string_literal: true
#
module Invites
  class AnswerService
    attr_reader :invite

    def initialize(invite)
      @invite = invite
    end

    def call; end

    def send_notifications
      room = @invite.room
      RoomsChannel.broadcast_to room,
                                user: @invite.user.with_invited_status(room),
                                type: 'ANSWER'
    end
  end
end
