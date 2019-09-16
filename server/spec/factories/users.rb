# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "person#{n}@example.com" }
    sequence(:username) { |n| "person#{n}" }
    password '123456'

    trait(:admin) do
      admin true
    end

    factory :user_with_messages do
      transient do
        messages_count 5
        send_for nil
      end

      after(:create) do |user, evaluator|
        create(:room_relation, user: user, room: evaluator.send_for)
        create_list(:message, evaluator.messages_count, sender: user, recipient: evaluator.send_for)
      end
    end
  end
end
