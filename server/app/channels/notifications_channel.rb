# frozen_string_literal: true

class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'notifications_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
