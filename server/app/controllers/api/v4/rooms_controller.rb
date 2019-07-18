# frozen_string_literal: true

class Api::V4::RoomsController < ApplicationController
  def show
    begin
      room = Room.includes(:messages, :users).find(params[:id])
      messages = room.messages.map(&:with_send_info)
      render json: { room: room.with_settings, messages: messages, users: room.users }
    rescue ArgumentError
      render json: { error: "error message" }
    end
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
    rescue ActiveRecord::RecordNotFound => exception
      render json: { success: false, errors: { record: [exception.message] } }
    end
  end

  def destroy
    room = Room.find(params[:id])
    render json: { destroyed: room.destroy }
  end

  def unsubscribe
    render json: { success: Rooms::UnsubscribeService.new(params[:id], params[:user_id]).call }
  end

  def read_all
    room_relation = RoomRelation.find_by(room_id: params[:id], user: current_user)
    room_relation&.update(unreaded_number: 0)
    render json: { success: true }
  end

  def set_max_users
    setting = Settings::RoomsService.new(params[:id], params[:new_value]).call
    room = Room.find(params[:id])
    render json: { success: setting, room: room.with_settings}
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
