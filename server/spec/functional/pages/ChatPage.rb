class ChatPage
  attr_accessor :message_field, :send_button

  def initialize(room_id, browser = Watir::Browser.new)
    @browser = browser
    visit_room(room_id)
    @message_field = @browser.text_field(:id, 'message-field')
    @send_button = @browser.button(:id, 'send-message-btn')
  end

  def method_missing(sym, *args, &block)
    @browser.send sym, *args, &block
  end

  def visit_room(room_id)
    @browser.a(:href, '/home/rooms').click
    @browser.a(:href, "/home/rooms/#{room_id}").click
    self
  end

  def send_message(content)
    message_field.set(content)
    sleep 2
    send_button.click
    self
  end
end