# frozen_string_literal: true

class Api::V4::InvitesController < ApplicationController
  before_action :set_invite, only: %i[accept reject]

  def index
    render json: { invites: current_user.sent_invites }
  end

  def create
    @invite = Invites::CreateService.new(invite_params[:content], invite_params[:user_id], invite_params[:room_id]).call
    render json: { success: @invite.valid?, invite: @invite, errors: @invite.errors }
  rescue NoMethodError => e
    render json: { success: false, errors: { record: [e.message] } }
  end

  def destroy
    invite = Invite.find_by(user_id: params[:user_id], room_id: params[:room_id])
    destroyed = invite.destroy
    NotificationsChannel.broadcast_to 'notifications_channel',
                                      invite: invite,
                                      type: 'CANCEL_INVITE'
    render json: {
      success: destroyed,
      invite: invite
    }
  end

  def accept
    render json: { success: Invites::AcceptService.new(@invite).call,
                   room: @invite.room,
                   user: @invite.user }
  end

  def read_all
    current_user.update(unread_notifications: 0)
    render json: { success: true }
  end

  def reject
    render json: { success: Invites::RejectService.new(@invite).call,
                   room: @invite.room,
                   user: @invite.user }
  end

  private

  def set_invite
    @invite = Invite.find(params[:id])
  end

  def invite_params
    params.require(:invite).permit(:user_id, :room_id, :content)
  end
end
