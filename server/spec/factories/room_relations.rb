# frozen_string_literal: true

FactoryGirl.define do
  factory :room_relation do
    user
    room
    status 'member'
    unread_number 0
  end
end
