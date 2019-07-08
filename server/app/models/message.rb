# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id', polymorphic: true
  belongs_to :recipient, class_name: 'Room', foreign_key: 'recipient_id', polymorphic: true
end
