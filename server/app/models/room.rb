# frozen_string_literal: true

class Room < ApplicationRecord
  has_one :setting, as: :target
  has_many :room_relations, dependent: :destroy
  has_many :users, through: :room_relations
  has_many :messages, as: :recipient, dependent: :destroy
  has_many :invites, dependent: :destroy

  searchkick text_middle: [:name, :creators_username]

  scope :search_import, -> { includes(:creator) }

  def with_member_status(user)
    attributes.merge({
                        member_status: user_status(user),
                    })
  end

  def with_settings
    attributes.merge({
                         max_users: max_users,
                         creator: creator.id
                     })
  end

  def creator
    room_relations.find_by(status: 'creator').user
  end

  def empty_slots
    max_users - invites.where(status: "sent").count - users.count
  end

  def max_users
    defined?(setting.value) ? setting.value : DefaultSetting.max_users.value
  end

  def search_data
    {
        name: name,
        creators_username: creator.username,
        creators_email: creator.email,
    }
  end

  private

  def user_status(user)
    user == creator ? 'creator' : 'member'
  end
end
