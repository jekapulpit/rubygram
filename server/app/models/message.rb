# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id', polymorphic: true
  belongs_to :recipient, class_name: 'Room', foreign_key: 'recipient_id', polymorphic: true
  searchkick text_middle: %i[content sender]

  scope :search_import, -> { includes(:sender) }
  scope :search_in_all_rooms, lambda { |content, sender|
                                search_import
                                  .search(content, where: { recipient_id: sender.rooms.pluck(:id) }, match: :text_middle, load: false)
                              }
  scope :search_in_room, lambda { |content, room_id|
                           search_import
                             .search(content, where: { recipient_id: room_id }, match: :text_middle, load: false)
                         }

  def with_send_info
    attributes.merge(
      senders_name: notification? ? sender.name : sender.username,
      send_time: created_at.strftime('%B %d, %Y')
    )
  end

  def search_data
    {
      content: content,
      senders_name: notification? ? sender.name : sender.username,
      recipient_id: recipient_id,
      sender_id: sender_id,
      send_time: created_at.strftime('%B %d, %Y')
    }
  end

  def notification?
    sender == recipient
  end
end
