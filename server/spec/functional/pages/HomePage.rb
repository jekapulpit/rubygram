class HomePage
  URL = 'http://localhost:3000/home'

  attr_accessor :rooms_link, :notifications_link, :profile_link

  def initialize(browser = Watir::Browser.new)
    @browser = browser
    @rooms_link         = @browser.a(:href, '/home/rooms')
    @notifications_link = @browser.a(:href, '/home/notifications')
    @profile_link       = @browser.a(:href, '/home/profile')
  end

  def method_missing(sym, *args, &block)
    @browser.send sym, *args, &block
  end

  def visit
    @browser.goto URL
  end

  def visit_rooms
    @browser.goto '/home/rooms'
  end

  def visit_notifications
    @browser.goto '/home/notifications'
  end

  def visit_profile
    @browser.goto '/home/profile'
  end

  def visit_room(room_id)
    @browser.goto "/home/rooms/#{room_id}"
  end
end