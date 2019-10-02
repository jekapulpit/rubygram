# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'sign in', type: :feature do
  let(:user) { FactoryGirl.create(:user) }
  let(:credentials) { { :email => user.email, :password => user.password } }
  let(:page) { LoginPage.new }
  context 'when data is correct' do
    before do
      page.visit
    end
    it 'should do nothing' do
      page.log_in(credentials)
    end
  end
  context 'when data is not correct' do
    before do
      page.visit
    end
    it 'should redirect to home page' do
      page.log_in(credentials)
    end
  end
end
