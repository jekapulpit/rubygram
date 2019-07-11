# frozen_string_literal: true

FactoryGirl.define do
  factory :room do
    name 'room'

    factory :filled_room do
      transient do
        users_count 5
        messages_count 5
      end

      after(:create) do |room, evaluator|
        create_list(:user_with_messages, evaluator.users_count, send_for: room)
      end
    end
  end
end
