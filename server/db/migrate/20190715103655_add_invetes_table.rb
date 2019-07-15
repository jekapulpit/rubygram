# frozen_string_literal: true

class AddInvetesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :invites do |t|
      t.string :content
      t.integer :invite_type, default: 0
      t.integer :status, default: 0
      t.references :user, foreign_key: true
      t.references :room, foreign_key: true
      t.timestamps
    end
  end
end
