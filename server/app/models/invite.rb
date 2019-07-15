# frozen_string_literal: true

class Invite < ApplicationRecord
  belongs_to :room
  belongs_to :user

  enum status: %i[sended accepted rejected]
  enum invite_type: %i[relation modering]

  def accept
    unless status != 'sended' || user.in?(room.users)
      room.users << user
      update(status: 'accepted')
    end
  end

  def reject
    update(status: 'rejected') unless status != 'sended' || user.in?(room.users)
  end
end
