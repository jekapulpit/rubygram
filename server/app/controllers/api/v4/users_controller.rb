class Api::V4::UsersController < ApplicationController
  def update
    begin
      user = User.find(params[:id])
      success = user.update_attributes(user_params)
      render json: { success: success, user: user.with_settings, errors: user.errors }
    rescue ActiveRecord::RecordNotFound => exception
      render json: { success: false, errors: { record: [exception.message] } }
    end
  end

  def show
    begin
      user = User.find(params[:id])
      render json: { success: true, user: user.with_settings, errors: user.errors }
    rescue ActiveRecord::RecordNotFound => exception
      render json: { success: false, errors: { record: [exception.message] } }
    end
  end

  def set_max_chats
    setting = Settings::UsersService.new(params[:id], params[:new_value], current_user).call
    user = User.find(params[:id])
    render json: { success: setting, user: user.with_settings }
  end

  def set_default_max_chats
    setting = Settings::DefaultService.new('max_chats', params[:new_value], current_user).call
    render json: { success: setting }
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
