# frozen_string_literal: true

class AddUnreadNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :unread_notifications, :integer, default: 0
  end
end
