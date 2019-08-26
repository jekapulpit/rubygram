class Rooms::ShowSerializer < ActiveModel::Serializer
  attributes :room, :messages, :users

  def room
    object.attributes
  end

  def messages
    ActiveModel::SerializableResource.new(
        object.messages.includes(:sender),
        each_serializer: Messages::DialogSerializer
    ).as_json
  end

  def users
    object.users
  end
end
