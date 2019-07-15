class User < ApplicationRecord
  has_many :room_relations
  has_many :messages, as: :sender
  has_many :rooms, through: :room_relations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  searchkick word_start: %i[username email]

  scope :search_by_email, ->(email) { search(email, fields: [{ email: :exact }, :username]) }
end
