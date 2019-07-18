class User < ApplicationRecord
  has_one :setting, as: :target
  has_many :room_relations
  has_many :invites
  has_many :messages, as: :sender
  has_many :rooms, through: :room_relations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  searchkick word_start: %i[username email]

  def invite_status(room)
    invite = Invite.find_by(room: room, user: self)
    if invite
      return invite.status
    end
    if in? room.users
      return "accepted"
    end
  end

  def sent_invites
    invites.where(status: 'sent')
  end

  def with_settings
    attributes.merge({
                         max_chats: max_chats,
                         empty_slots: empty_slots
                    })
  end

  def with_invited_status(room)
    attributes.merge({
                         invite_status: invite_status(room),
                    })
  end

  def all_rooms
    rooms.map { |room| room.with_member_status(self) }
  end

  def max_chats
    defined?(setting.value) ? setting.value : DefaultSetting.max_chats.value
  end

  def empty_slots
    max_chats - room_relations.where(status: 'creator').count
  end

  scope :search_by_email, ->(email) { search(email, fields: [{ email: :exact }, :username]) }
  scope :search_for_invite, ->(request, room_id) { search_by_email(request).map { |user| user.with_invited_status(Room.find(room_id)) } }
end
