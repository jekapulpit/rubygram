# frozen_string_literal: true

class DefaultSetting < ApplicationRecord
  scope :max_chats, -> { find_by(setting_type: 'max_chats') }
  scope :max_users, -> { find_by(setting_type: 'max_users') }
end
