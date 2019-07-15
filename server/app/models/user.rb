class User < ApplicationRecord
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
  end

  def with_invited_status(room)
    attributes.merge(
        invite_status: invite_status(room),
    )
  end

  scope :search_by_email, ->(email) { search(email, fields: [{ email: :exact }, :username]) }
  scope :search_for_invite, ->(request, room_id) { search_by_email(request).map { |user| user.with_invited_status(Room.find(room_id)) } }
end
