# frozen_string_literal: true

class ChangeColumnsName < ActiveRecord::Migration[5.2]
  def change
    rename_column :room_relations, :unreaded_number, :unread_number
  end
end
