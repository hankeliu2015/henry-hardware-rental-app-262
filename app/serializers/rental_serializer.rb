class RentalSerializer < ActiveModel::Serializer
  attributes :id, :tool_id, :start_date, :return_date, :checkout
  belongs_to :tool
  belongs_to :user
end
