# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table 'messages', force: :cascade do |t|
      t.text 'content'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.integer 'sender_id'
      t.integer 'recipient_id'
      t.string 'recipient_type'
      t.string 'sender_type'
    end
  end
end
