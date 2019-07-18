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

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
