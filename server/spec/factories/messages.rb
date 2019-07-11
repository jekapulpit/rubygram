# frozen_string_literal: true

FactoryGirl.define do
  factory :message do
    association :recipient, factory: :room
    association :sender, factory: :user
    content 'content'
  end
end
