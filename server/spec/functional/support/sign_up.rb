module Support
  class SignUp
    URL = 'http://localhost:3000/login'

    attr_accessor :email_field, :password_field, :submit_button

    def initialize(browser = Watir::Browser.new)
      @browser = browser
      visit
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

    def authorised?
      @browser.a(:href, '/home/rooms').exists?
    end

    def call(credentials)
      email_field.set credentials[:email]
      password_field.set credentials[:password]
      submit_button.click
      @browser
    end
  end
end
