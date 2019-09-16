# frozen_string_literal: true

module Invites
  class RejectService < AnswerService
    def call
      if @invite.accept
        send_notifications
        return true
      end
      false
    end
  end
end
