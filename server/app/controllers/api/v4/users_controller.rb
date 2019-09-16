# frozen_string_literal: true

class Api::V4::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: :create

  def update
    user = User.find(params[:id])
    success = user.update_attributes(user_params)
    render json: { success: success, user: user.with_settings, errors: user.errors }
  rescue ActiveRecord::RecordNotFound => e
    render json: { success: false, errors: { record: [e.message] } }
  end

  def create
    user = User.create(register_user_params)
    render json: { success: user.save }
  end

  def show
    user = User.find(params[:id])
    render json: { success: true, user: user.with_settings, errors: user.errors }
  rescue ActiveRecord::RecordNotFound => e
    render json: { success: false, errors: { record: [e.message] } }
  end

  def set_max_chats
    setting = Settings::UsersService.new(params[:id], params[:new_value], current_user).call
    user = User.find(params[:id])
    user.reindex
    render json: { success: setting, user: user.with_settings }
  end

  def set_default_max_chats
    setting = Settings::DefaultService.new('max_chats', params[:new_value], current_user).call
    User.reindex
    render json: { success: setting }
  end

  def get_default_max_chats
    setting = DefaultSetting.find_by(setting_type: 'max_chats')
    render json: { setting: setting }
  end

  def give_permissions
    user = User.find(params[:id])
    render json: { success: user.update(admin: true), user: user.with_settings }
  end

  def ignore_by_room
    deleted_invites = BlackLists::AddService.new(Room.find(params[:id]).user_id, current_user.id).call
    render json: {
      success: true,
      deleted_invites: deleted_invites.pluck(:id)
    }
  end

  def ignore
    deleted_invites = BlackLists::AddService.new(User.find(params[:id]), current_user.id).call
    render json: {
      success: true,
      deleted_invites: deleted_invites.pluck(:id)
    }
  end

  def stop_ignore
    target = User.find(params[:id])
    render json: {
      success: current_user.stop_ignore(target),
      user: target
    }
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end

  def register_user_params
    params.permit(:username, :email, :password)
  end
end
