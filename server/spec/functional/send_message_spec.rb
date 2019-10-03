# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'send message' do
  let(:room) { Room.first }
  let(:sender) { room.users.first }
  let(:receiver) { room.users.last }
  let(:test_message_content) { 'test_message' }

  context 'from senders view' do
    let(:browser) { Support::SignUp.new.call({:email => sender.email, :password => '123456'}) }
    it 'message should be sent' do
      browser.a(:href, '/home/rooms').click
      browser.a(:href, "/home/rooms/#{room.id}").click
      browser.text_field(:id, 'message-field').set(test_message_content)
      browser.button(:id, 'send-message-btn').click
      browser.text.should match(/.*#{test_message_content}.*/)
    end
  end

  context 'from receivers view' do
    let(:browser) { Support::SignUp.new.call({:email => sender.email, :password => '123456'}) }
    it 'message should be sent' do
      browser.a(:href, '/home/rooms').click
      browser.a(:href, "/home/rooms/#{room.id}").click
      browser.text.should match(/.*#{test_message_content}.*/)
    end
  end
  after(:context) do
    Message.last.destroy
  end
end
