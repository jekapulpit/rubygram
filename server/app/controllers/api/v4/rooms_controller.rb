# frozen_string_literal: true

class Api::V4::RoomsController < ApplicationController
  def show
    room = Room.includes(:messages, :users).find(params[:id])
    render json: room, serializer: Rooms::ShowSerializer
  rescue ArgumentError
    render json: { error: 'error message' }
  end

  def index
    rooms = current_user.all_rooms
    render json: { rooms: rooms }
  end

  def create
    room = Rooms::CreateService.new(room_params[:name], current_user).call
    render json: { room: room.with_member_status(current_user), success: room.valid?, errors: room.errors }
  end

  def update
    room = Room.find(params[:id])
    begin
      success = room.update_attributes(room_params)
      render json: { success: success, room: room.with_member_status(current_user), errors: room.errors }
    rescue ActiveRecord::RecordNotFound => e
      render json: { success: false, errors: { record: [e.message] } }
    end
  end

  def destroy
    room = Room.find(params[:id])
    render json: { destroyed: room.destroy }
  end

  def unsubscribe
    success = Rooms::UnsubscribeService.new(params[:id], params[:user_id]).call
    if success
      RoomsChannel.broadcast_to Room.find(params[:id]),
                                user_id: params[:user_id],
                                type: 'UNSUBSCRIBE'
    end
    render json: { success: success }
  end

  def read_all
    room_relation = RoomRelation.find_by(room_id: params[:id], user: current_user)
    room_relation.update(unread_number: 0)
    render json: { success: true }
  end

  def set_max_users
    setting = Settings::RoomsService.new(params[:id], params[:new_value], current_user).call
    room = Room.find(params[:id])
    room.reindex
    render json: { success: setting, room: room.with_settings }
  end

  def set_default_max_users
    setting = Settings::DefaultService.new('max_users', params[:new_value], current_user).call
    Room.reindex
    render json: { success: setting }
  end

  def get_default_max_users
    setting = DefaultSetting.find_by(setting_type: 'max_users')
    render json: { setting: setting }
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
