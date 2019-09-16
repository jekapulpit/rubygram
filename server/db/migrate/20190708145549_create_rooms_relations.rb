# frozen_string_literal: true

class CreateRoomsRelations < ActiveRecord::Migration[5.2]
  def change
    create_table :room_relations do |t|
      t.references :room, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :status
      t.integer :unreaded_number, default: 0
      t.timestamps
    end
  end
end
