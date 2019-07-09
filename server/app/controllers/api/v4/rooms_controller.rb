# frozen_string_literal: true

class Api::V4::RoomsController < ApplicationController
  def show
    begin
      room = Room.includes(:messages, :users).find(params[:id])
      messages = room.messages
      render json: { room: room, messages: messages, users: room.users }
    rescue ArgumentError
      render json: { error: "error message" }
    end
  end

  def index
    rooms = current_user.rooms
    render json: { rooms: rooms }
  end

  def create
    room = Room.new(room_params)
    current_user.rooms << room
    render json: { room: room, success: room.valid? }
  end

  def destroy
    room = Room.find(params[:id])
    render json: { destroyed: room.destroy }
  end

  def read_all
    room_relation = RoomRelation.find_by(room_id: params[:id], user: current_user)
    room_relation&.update(unreaded_number: 0)
    render json: { success: true }
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
