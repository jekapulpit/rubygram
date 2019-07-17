# frozen_string_literal: true

class Setting < ApplicationRecord
  belongs_to :target, polymorphic: true
end
