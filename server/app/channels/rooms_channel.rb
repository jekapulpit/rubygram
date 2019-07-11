# frozen_string_literal: true

class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @room = 'all_rooms'
    stream_for @room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data); end

  def send_message(data)
    RoomsChannel.broadcast_to(@room, data)
  end

  def send_invite(data)
    RoomsChannel.broadcast_to(@room, data)
  end

  def update_invite(data)
    RoomsChannel.broadcast_to(@room, data)
  end

  def delete_message(data)
    RoomsChannel.broadcast_to(@room, data)
  end
end
