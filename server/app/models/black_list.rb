# frozen_string_literal: true

class BlackList < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id', polymorphic: true
  belongs_to :target, class_name: 'User', foreign_key: 'target_id', polymorphic: true
end
