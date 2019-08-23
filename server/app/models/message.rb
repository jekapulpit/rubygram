# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id', polymorphic: true
  belongs_to :recipient, class_name: 'Room', foreign_key: 'recipient_id', polymorphic: true
  searchkick text_middle: [:content]

  scope :search_import, -> { includes(:sender) }
  scope :search_in_all_rooms, ->(content, sender) { search(content, where: {recipient_id: sender.rooms.pluck(:id)}, match: :text_middle) }
  scope :search_in_room, ->(content, room_id) { search(content, where: {recipient_id: room_id}, match: :text_middle) }

  def with_send_info
    attributes.merge({
      senders_name: sender.username,
      send_time: created_at.strftime("%B %d, %Y")
    })
  end

  def search_data
    {
        content: content,
        sender: sender.username,
        recipient_id: recipient_id
    }
  end
end
