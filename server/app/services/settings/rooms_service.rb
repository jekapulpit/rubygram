# frozen_string_literal: true

module Settings
  class RoomsService
    attr_reader :room, :new_value, :current_user

    def initialize(room_id, new_value, current_user)
      @room = Room.find(room_id)
      @new_value = new_value
      @current_user = current_user
    end

    def call
      return false unless current_user.admin? && new_value >= 0

      special_setting ?
          special_setting.update(value: new_value) : Setting.create(target: room, value: new_value)
    end

    def special_setting
      Setting.find_by(target: room)
    end
  end
end
