# frozen_string_literal: true

class User < ApplicationRecord
  has_one :setting, as: :target
  has_many :room_relations
  has_many :invites
  has_many :black_lists, as: :owner
  has_many :ignoring_users, through: :black_lists, source: :target, source_type: 'User'
  has_many :messages, as: :sender
  has_many :rooms, through: :room_relations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  searchkick word_start: %i[username email]

  def invite_status(room)
    invite = Invite.find_by(room: room, user: self)
    return 'ignoring' if ignoring?(room.creator)
    return invite.status if invite
    return 'accepted' if in? room.users
  end

  def ignoring?(user)
    user.id.in? black_lists.pluck(:target_id)
  end

  def stop_ignore(user)
    ignore = black_lists.where(target: user)
    ignore&.destroy_all
  end

  def sent_invites
    invites.where(status: 'sent')
  end

  def with_settings
    attributes.merge(
      max_chats: max_chats,
      empty_slots: empty_slots,
      ignoring_users: ignoring_users.distinct,
      unread_number: room_relations ? room_relations.pluck(:unread_number).sum : 0
    )
  end

  def with_invited_status(room)
    attributes.merge(
      invite_status: invite_status(room)
    )
  end

  def all_rooms
    rooms.joins(:room_relations)
         .select("distinct on (room_relations.room_id) rooms.*, room_relations.unread_number as unread_number, (case
                 when room_relations.status = 1 then 'creator'
                 else 'member' end) as member_status")
  end

  def max_chats
    defined?(setting.value) ? setting.value : self.class.default_max_chats
  end

  def empty_slots
    max_chats - room_relations.where(status: 'creator').count
  end

  def search_data
    {
      email: email,
      username: username,
      admin: admin,
      max_chats: max_chats
    }
  end

  def self.default_max_chats
    @@default_setting ||= DefaultSetting.max_chats.value
  end

  def self.clear_max_chats
    @@default_setting = nil
  end

  scope :search_import, -> { includes(:room_relations, :setting) }

  scope :search_by_email, lambda { |email|
    search(email, fields: [{ email: :exact }, :username])
  }

  scope :search_for_settings, lambda { |email|
    search(email, fields: [{ email: :exact }, :username], load: false).results
  }

  scope :search_for_invite, lambda { |request, room_id|
    search_by_email(request).map { |user| user.with_invited_status(Room.find(room_id)) }
  }
end
