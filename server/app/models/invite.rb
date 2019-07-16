# frozen_string_literal: true

class Invite < ApplicationRecord
  belongs_to :room
  belongs_to :user

  enum status: %i[sent accepted rejected]

  def accept
    unless status != 'sent' || user.in?(room.users)
      room.users << user
      update(status: 'accepted')
    end
    self
  end

  def reject
    update(status: 'rejected') unless status != 'sent' || user.in?(room.users)
    self
  end
end
