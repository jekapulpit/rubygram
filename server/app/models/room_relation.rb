# frozen_string_literal: true

class RoomRelation < ApplicationRecord
  belongs_to :user
  belongs_to :room

  enum status: %i[member creator]
end
