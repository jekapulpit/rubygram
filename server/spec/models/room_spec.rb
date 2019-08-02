# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:room) { FactoryGirl.create(:filled_room, users_count: 1) }
  describe 'room#creator' do
    it 'should return user instance' do
      expect(room.creator).to be_instance_of(User)
    end
  end
end
