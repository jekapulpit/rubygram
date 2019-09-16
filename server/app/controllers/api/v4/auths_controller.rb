# frozen_string_literal: true

class Api::V4::AuthsController < ApplicationController
  skip_before_action :authenticate_user, only: :create

  def create
    token_command = Users::AuthenticateUserCommand.call(*params.slice(:email, :password).values)

    if token_command.success?
      render json: {
        token: token_command.result,
        current_user: User.find_by(email: params[:email]).with_settings
      }
    else
      render json: { error: token_command.errors }, status: :unauthorized
    end
  end

  def sync
    render json: {
      current_user: current_user.with_settings
    }
  end
end
