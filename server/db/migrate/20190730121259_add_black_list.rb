# frozen_string_literal: true

class AddBlackList < ActiveRecord::Migration[5.2]
  def change
    create_table 'black_lists', force: :cascade do |t|
      t.integer 'owner_id', index: true
      t.integer 'target_id', index: true
      t.string 'owner_type'
      t.string 'target_type'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
    end
  end
end
