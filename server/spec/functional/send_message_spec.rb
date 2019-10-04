# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'send message', type: :feature do
  let(:test_message_content) { 'test_message' }

  before(:all) do
    @test_message = 'test_message'
    @room = FactoryGirl.create(:filled_room, users_count: 1)
    @sender = @room.users.first
    @receiver = @room.users.last
    Support::SignUp.new(browser).call({:email => @sender.email, :password => '123456'})
    chat_page = ChatPage.new(@room.id, browser)
    chat_page.send_message(@test_message)
  end

  context 'from senders view' do
    it 'message should be sent' do
      browser.text.should match(/.*#{test_message_content}.*/)
    end
  end

  context 'from receivers view' do
    before do
      Support::SignUp.new(browser).call({:email => @receiver.email, :password => '123456'})
      chat_page = ChatPage.new(@room.id, browser)
    end
    it 'message should be received' do
      browser.text.should match(/.*#{test_message_content}.*/)
    end
  end

  after(:context) do
    Message.last.destroy
    Room.destroy_all
    User.destroy_all
  end
end
