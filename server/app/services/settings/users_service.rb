# frozen_string_literal: true

module Settings
  class UsersService
    attr_reader :user, :new_value, :current_user

    def initialize(user_id, new_value, current_user)
      @user = User.find(user_id)
      @new_value = new_value
      @current_user = current_user
    end

    def call
      return false unless current_user.admin? && new_value >= 0

      special_setting ?
          special_setting.update(value: new_value) : Setting.create(target: user, value: new_value)
    end

    def special_setting
      Setting.find_by(target: user)
    end
  end
end
