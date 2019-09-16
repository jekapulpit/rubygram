# frozen_string_literal: true

class AddSettingsTable < ActiveRecord::Migration[5.2]
  def change
    create_table 'settings', force: :cascade do |t|
      t.belongs_to :target, polymorphic: true
      t.integer :value
      t.string 'setting_type'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
    end
  end
end
