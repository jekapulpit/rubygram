module Settings
  class RoomsService
    attr_reader :room, :new_value, :current_user

    def initialize(room_id, new_value, current_user)
      @room = Room.find(room_id)
      @new_value = new_value
      @current_user = current_user
    end

    def call
      return false unless (current_user.admin? && new_value >= 0)
      room.update_attributes(setting: Setting.find_or_create_by(target: room, value: new_value))
    end
  end
end