module Settings
  class UsersService
    attr_reader :user, :new_value

    def initialize(user_id, new_value)
      @user = User.find(user_id)
      @new_value = new_value
    end

    def call
      special_setting ?
          special_setting.update(value: new_value)
          :
          Setting.create(target: user, value: new_value)
    end

    def special_setting
      Setting.find_by(target: user)
    end
  end
end