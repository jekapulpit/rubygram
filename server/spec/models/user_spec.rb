# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:room) { FactoryGirl.create(:filled_room, users_count: 1) }
  let(:creator) { room.creator }
  let(:outsider) { FactoryGirl.create(:user) }

  before do
    FactoryGirl.create(:default_setting, :max_chats)
    FactoryGirl.create(:default_setting, :max_users)
  end

  describe 'user#with_invited_status' do
    context 'when inside the room' do
      it 'should be with invite_status field with accepted value' do
        expect(creator.with_invited_status(room)[:invite_status]).to eq 'accepted'
      end
    end

    context 'when not inside the room and not invited' do
      it 'should be with invite_status field with nil value' do
        expect(outsider.with_invited_status(room)[:invite_status]).to be_nil
      end
    end

    context 'when not inside the room and invited' do
      before do
        Invites::CreateService.new('test content', outsider.id, room.id).call
      end
      it 'should be with invite_status field with its value' do
        expect(outsider.with_invited_status(room)[:invite_status]).to eq 'sent'
      end
    end
  end

  describe 'user#ignore' do
    before do
      Invites::CreateService.new('test content', outsider.id, room.id).call
    end

    context 'when user not in black list' do
      it 'invites not should be empty' do
        expect(outsider.invites.where(room_id: creator
                                                   .rooms
                                                   .includes(:room_relations)
                                                   .where(room_relations: {status: "creator"}))).not_to be_empty
      end
    end

    context 'when user in black list' do
      before do
        outsider.ignore(creator)
      end
      it 'should delete all invites from this user' do
        expect(outsider.invites.where(room_id: creator
                                                   .rooms
                                                   .includes(:room_relations)
                                                   .where(room_relations: {status: "creator"}))).to be_empty
      end
      it 'new invites should not be created' do
        expect(Invites::CreateService.new('test content', outsider.id, room.id).call).to be_nil
      end
    end
  end
end
