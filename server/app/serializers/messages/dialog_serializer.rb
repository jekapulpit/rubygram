# frozen_string_literal: true

class Messages::DialogSerializer < ActiveModel::Serializer
  attributes :id, :content, :sender_id, :recipient_id, :sender_type, :senders_name, :send_time

  def senders_name
    object.notification? ? object.sender.name : object.sender.username
  end

  def send_time
    object.created_at.strftime('%B %d, %Y')
  end
end
