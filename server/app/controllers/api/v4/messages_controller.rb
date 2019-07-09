# frozen_string_literal: true

class Api::V4::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    message = Message.new(message_params_secure)
    increment_unreaded(message.recipient)
    render json: {
      success: message.save,
      message: message,
      errors: message.errors
    }
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
