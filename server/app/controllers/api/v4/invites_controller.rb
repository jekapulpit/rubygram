# frozen_string_literal: true

class Api::V4::InvitesController < ApplicationController
  def accept
    invite = Invite.find(params[:id])
    if invite.accept
      NotificationsChannel.broadcast_to 'notifications_channel', invite
      render json: { success: true, room: invite.room, user: invite.user }
    else
      render json: { success: false }
    end
  end

  def reject
    invite = Invite.find(params[:id])
    if invite.reject
      NotificationsChannel.broadcast_to 'notifications_channel', invite
      render json: { success: true, room: invite.room, user: invite.user }
    else
      render json: { success: false }
    end
  end

  def create
    begin
      invite = Invites::CreateService.create(invite_params[:content], invite_params[:user_id], invite_params[:room_id]).call
      NotificationsChannel.broadcast_to 'notifications_channel', invite if invite.valid?
      render json: { success: invite.valid?, invite: invite, errors: invite.errors }
    rescue NoMethodError => exception
      render json: { success: false, errors: { record: [exception.message] }}
    end
  end

  def index
    render json: { invites: current_user.sent_invites }
  end

  private

  def invite_params
    params.require(:invite).permit(:user_id, :room_id, :content)
  end
end
