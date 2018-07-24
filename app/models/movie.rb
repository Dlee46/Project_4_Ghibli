class Movie < ApplicationRecord
  has_one :user through: :reviews
  has_many :reviews, dependent: :destroy

end
