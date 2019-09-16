# frozen_string_literal: true

module Settings
  class DefaultService
    attr_reader :setting_type, :new_value, :current_user

    def initialize(setting_type, new_value, current_user)
      @setting_type = setting_type
      @new_value = new_value
      @current_user = current_user
    end

    def call
      return false unless current_user.admin? && new_value >= 0

      self.class.clear_defaults
      target_setting.update(value: new_value)
    end

    def target_setting
      DefaultSetting.find_by(setting_type: setting_type)
    end

    def self.clear_defaults
      Room.clear_max_users
      User.clear_max_chats
    end
  end
end
