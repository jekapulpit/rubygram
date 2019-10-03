class ChatPage
  URL = 'http://localhost:3000/home/rooms'

  attr_accessor :message_field, :send_button

  def initialize(room_id, browser = Watir::Browser.new)
    @browser = browser
    @message_field = @browser.text_field(:id, 'message-field')
    @send_button = @browser.button(:id, 'send-message-btn')
    visit_room(room_id)
  end

  def method_missing(sym, *args, &block)
    @browser.send sym, *args, &block
  end

  def visit_room(room_id)
    @browser.goto "#{URL}/#{room_id}"
  end

  def send_message(content)
    message_field.set(content)
    send_button.click
    self
  end
end