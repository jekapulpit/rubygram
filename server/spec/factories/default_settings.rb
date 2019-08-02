# frozen_string_literal: true

FactoryGirl.define do
  factory :default_setting do
    value 5

    trait :max_chats do
      setting_type 'max_chats'
    end

    trait :max_users do
      setting_type 'max_users'
    end
  end
end
