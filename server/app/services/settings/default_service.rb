module Settings
  class DefaultService
    attr_reader :setting_type, :new_value, :current_user

    def initialize(setting_type, new_value, current_user)
      @setting_type = setting_type
      @new_value = new_value
      @current_user = current_user
    end

    def call
      return false unless current_user.admin?
      target_setting.update(value: new_value)
    end

    def target_setting
      DefaultSetting.find_by(setting_type: setting_type)
    end
  end
end