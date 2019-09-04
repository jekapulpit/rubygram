module Settings
  class UsersService
    attr_reader :user, :new_value, :current_user

    def initialize(user_id, new_value, current_user)
      @user = User.find(user_id)
      @new_value = new_value
      @current_user = current_user
    end

    def call
      return false unless (current_user.admin? && new_value >= 0)
      user.update_attributes(setting: Setting.find_or_create_by(target: user, value: new_value))
    end
  end
end