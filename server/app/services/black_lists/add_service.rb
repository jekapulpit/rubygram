# frozen_string_literal: true

module BlackLists
  class AddService
    attr_reader :target, :owner

    def initialize(target_id, owner_id)
      @target = User.find(target_id)
      @owner = User.find(owner_id)
    end

    def call
      add_target_to_black_list
      destroy_invites_from_target
    end

    def add_target_to_black_list
      owner.black_lists << BlackList.new(target: target)
    end

    def destroy_invites_from_target
      owner.invites.where(room_id: target
                                 .rooms
                                 .joins(:room_relations)
                                 .where(room_relations: { status: 'creator' })
                                 .distinct
                                 .pluck(:id)).destroy_all
    end
  end
end
