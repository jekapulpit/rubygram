# frozen_string_literal: true

class Api::V4::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    room = Room.find(message_params[:recipient_id])
    if message.save
      increment_unread(room)
      RoomsChannel.broadcast_to room, message.with_send_info
      render json: {
          success: true,
          message: message,
      }
    else
      render json: {
          success: false,
          errors: message.errors
      }
    end
  end

  def destroy
    message = Message.find(params[:id])
    destroyed = message.destroy
    render json: {
        success: destroyed,
        message: message,
        errors: message.errors
    }
  end

  private

  def increment_unread(room)
    room_relations = room.room_relations
    room_relations.update_all('unread_number = unread_number + 1') if room_relations.any?
  end

  def message_params
    params.require(:message).permit(:content, :sender_id, :recipient_id, :recipient_type, :sender_type)
  end
end
