# frozen_string_literal: true

FactoryGirl.define do
  factory :room_relation do
    user
    room
  end
end
