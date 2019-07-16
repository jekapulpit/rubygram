# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :room_relations, dependent: :destroy
  has_many :users, through: :room_relations
  has_many :messages, as: :recipient, dependent: :destroy

  def creator
    room_relations.find_by(status: 'creator').user
  end
end
