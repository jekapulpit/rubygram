# frozen_string_literal: true

class Api::V4::SearchController < ApplicationController
  def find_users
    results = User.search_by_email(params[:request])
    render json: { results: results }
  end
end
