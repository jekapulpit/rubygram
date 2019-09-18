# frozen_string_literal: true

class Api::V4::MessagesController < ApplicationController
  def create
    room = Room.find(message_params[:recipient_id])
    message = Messages::CreateService
                  .new(message_params[:content], room, current_user)
                  .call
    render json: {
        success: message.errors.empty?,
        message: message,
        errors: message.errors
    }
  end

  def destroy
    message = Message.find(params[:id])
    room = message.recipient
    destroyed = message.destroy
    RoomsChannel.broadcast_to room,
                              message: message,
                              type: 'DELETE_MESSAGE'
    render json: {
      success: destroyed,
      message: message,
      errors: message.errors
    }
  end

  private

  def message_params
    params.require(:message).permit(:content, :sender_id, :recipient_id, :recipient_type, :sender_type)
  end
end
