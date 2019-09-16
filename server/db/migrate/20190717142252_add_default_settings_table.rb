# frozen_string_literal: true

class AddDefaultSettingsTable < ActiveRecord::Migration[5.2]
  def change
    create_table 'default_settings', force: :cascade do |t|
      t.integer :value
      t.string 'setting_type'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
    end
  end
end
