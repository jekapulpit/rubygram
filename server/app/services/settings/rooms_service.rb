module Settings
  class RoomsService
    attr_reader :room, :new_value

    def initialize(room_id, new_value)
      @room = User.find(room_id)
      @new_value = new_value
    end

    def call
      special_setting ?
          special_setting.update(value: new_value)
          :
          Setting.create(target: room, value: new_value)
    end

    def special_setting
      Setting.find_by(target: room)
    end
  end
end