# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BlackLists::AddService do
  let(:room) { FactoryGirl.create(:filled_room, users_count: 1) }
  let(:creator) { room.creator }
  let(:outsider) { FactoryGirl.create(:user) }
  before do
    FactoryGirl.create(:default_setting, :max_chats)
    FactoryGirl.create(:default_setting, :max_users)
    Invites::CreateService.new('test content', outsider.id, room.id).call
  end

  context 'when user not in black list' do
    it 'invites not should be empty' do
      expect(outsider.invites.where(room_id: creator
                                                 .rooms
                                                 .includes(:room_relations)
                                                 .where(room_relations: { status: 'creator' }))).not_to be_empty
    end
  end

  context 'when user in black list' do
    before do
      BlackLists::AddService.new(creator.id, outsider.id)
    end
    it 'should delete all invites from this user' do
      expect(creator.invites.where(room_id: creator
                                                 .rooms
                                                 .includes(:room_relations)
                                                 .where(room_relations: { status: 'creator' }))).to be_empty
    end
    it 'new invites should not be created' do
      expect(Invites::CreateService.new('test content', outsider.id, room.id).call.id).to be_nil
    end
  end
end
