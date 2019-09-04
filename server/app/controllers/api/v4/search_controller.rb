# frozen_string_literal: true

class Api::V4::SearchController < ApplicationController
  def find_users
    results = params[:room_id] ? User.search_for_invite(params[:request], params[:room_id]) : User.search_for_settings(params[:request])
    render json: { results: results }
  end

  def find_messages_in_room
    results = Message.search_in_room(params[:request], params[:room_id])
    render json: { results: results }
  end

  def find_messages
    results = Message.search_in_all_rooms(params[:request], current_user)
    render json: { results: results }
  end

  def find_rooms
    results = Room.search(params[:request], load: false, match: :text_middle).results
    render json: { results: results }
  end
end
