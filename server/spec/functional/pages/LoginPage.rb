class LoginPage
  URL = 'http://localhost:3000/login'

  attr_accessor :email_field, :password_field, :submit_button

  def initialize(browser = Watir::Browser.new)
    @browser = browser
    @email_field         = @browser.text_field(:name, 'email')
    @password_field      = @browser.text_field(:name, 'password')
    @submit_button       = @browser.button(:id, 'form-submit-btn')
  end

  def method_missing(sym, *args, &block)
    @browser.send sym, *args, &block
  end

  def visit
    @browser.goto URL
  end

  def page_title
    @browser.title
  end

  def log_in(credentials)
    self.email_field.set credentials[:email]
    self.password_field.set credentials[:password]
    self.submit_button.click
    # home_page = GoogleResultsPage.new(browser)
  end
end