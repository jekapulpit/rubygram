# frozen_string_literal: true

class Api::V4::InvitesController < ApplicationController
  before_action :set_invite, only: %i[destroy accept reject]

  def index
    render json: { invites: current_user.sent_invites }
  end

  def create
    begin
      @invite = Invites::CreateService.new(invite_params[:content], invite_params[:user_id], invite_params[:room_id]).call
      NotificationsChannel.broadcast_to 'notifications_channel', @invite if @invite.valid?
      render json: { success: @invite.valid?, invite: @invite, errors: @invite.errors }
    rescue NoMethodError => exception
      render json: { success: false, errors: { record: [exception.message] }}
    end
  end

  def destroy
  end

  def accept
    if @invite.accept
      render json: { success: true, room: @invite.room, user: @invite.user }
    else
      render json: { success: false }
    end
  end

  def read_all
    current_user.update(unread_notifications: 0)
    render json: { success: true }
  end

  def reject
    if @invite.reject
      render json: { success: true, room: @invite.room, user: @invite.user }
    else
      render json: { success: false }
    end
  end

  private

  def set_invite
    @invite = Invite.find(params[:id])
  end

  def invite_params
    params.require(:invite).permit(:user_id, :room_id, :content)
  end
end
