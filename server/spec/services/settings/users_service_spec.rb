# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Settings::UsersService do
  let(:room) { FactoryGirl.create(:filled_room, users_count: 1) }
  let(:user) { room.users.first }
  let(:default_value) { DefaultSetting.max_chats.value }
  let(:new_value) { default_value + 1 }
  before do
    Settings::DefaultService.clear_defaults
  end
  context 'when not changed' do
    it 'should be equal default value' do
      expect(user.max_chats).to eq default_value
    end
    it 'has not special settings' do
      expect(Setting.find_by(target: user)).to be_nil
    end
  end

  context 'when changed' do
    before do
      Settings::UsersService.new(user.id, new_value, FactoryGirl.create(:user, :admin)).call
    end
    it 'should be equal new value' do
      expect(user.max_chats).to eq new_value
    end
    it 'has special setting' do
      expect(Setting.find_by(target: user)).to be_instance_of(Setting)
    end
  end
end
