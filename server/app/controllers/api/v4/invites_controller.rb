# frozen_string_literal: true

class Api::V4::InvitesController < ApplicationController
  def accept
    invite = Invite.find(params[:id])
    render json: { accepted: invite.accept, room: invite.room, user: invite.user }
  end

  def reject
    invite = Invite.find(params[:id])
    render json: { accepted: invite.reject, room: invite.room, user: invite.user }
  end

  def create
    invite = Invites::CreateService.new(invite_params[:content], invite_params[:user_id], invite_params[:room_id]).call
    render json: { success: invite.valid?, invite: invite, errors: invite.errors }
  end

  def index
    render json: { invites: current_user.invites.where(status: 'sended') }
  end

  private

  def invite_params
    params.require(:invite).permit(:user_id, :room_id, :content)
  end
end
