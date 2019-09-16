# frozen_string_literal: true

class Rooms::ShowSerializer < ActiveModel::Serializer
  attributes :room, :messages, :users

  def room
    object.with_settings
  end

  def messages
    ActiveModel::SerializableResource.new(
      object.messages.includes(:sender).order(:created_at),
      each_serializer: Messages::DialogSerializer
    ).as_json
  end

  def users
    object.users
  end
end
