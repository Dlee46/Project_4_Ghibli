class AddDescriptionsToMovies < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :description, :string
  end
end
