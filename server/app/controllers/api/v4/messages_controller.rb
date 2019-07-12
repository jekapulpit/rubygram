# frozen_string_literal: true

class Api::V4::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    message = Message.new(message_params)
    room = message_params[:recipient_id]
    if message.save
      RoomsChannel.broadcast_to room, message
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

  def message_params
    params.require(:message).permit(:content, :sender_id, :recipient_id, :recipient_type, :sender_type)
  end
end
