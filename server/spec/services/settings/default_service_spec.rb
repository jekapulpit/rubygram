# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Settings::DefaultService do
  let(:room) { FactoryGirl.create(:filled_room, users_count: 1) }
  let(:user) { room.users.first }
  let(:new_value) { 10 }
  context 'when settings for room' do
    context 'when not changed' do
      it 'should be equal 5' do
        expect(room.max_users).to eq 5
      end
      it 'has not special settings' do
        expect(Setting.find_by(target: room)).to be_nil
      end
    end

    context 'when changed' do
      before do
        Settings::DefaultService.new('max_users', new_value, FactoryGirl.create(:user, :admin)).call
      end
      it 'should be equal new value' do
        expect(room.max_users).to eq new_value
      end
      it 'has not special settings' do
        expect(Setting.find_by(target: room)).to be_nil
      end
    end
  end

  context 'when settings for user' do
    context 'when not changed' do
      it 'should be equal 5' do
        expect(user.max_chats).to eq 5
      end
      it 'has not special settings' do
        expect(Setting.find_by(target: user)).to be_nil
      end
    end

    context 'when changed' do
      before do
        Settings::DefaultService.new('max_chats', new_value, FactoryGirl.create(:user, :admin)).call
      end
      it 'should be equal new value' do
        expect(user.max_chats).to eq new_value
      end
      it 'has not special settings' do
        expect(Setting.find_by(target: user)).to be_nil
      end
    end
  end
end
