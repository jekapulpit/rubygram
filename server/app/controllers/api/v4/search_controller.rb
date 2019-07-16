# frozen_string_literal: true

class Api::V4::SearchController < ApplicationController
  def find_users
    results = User.search_for_invite(params[:request], params[:room_id])
    render json: { results: results }
  end
end
