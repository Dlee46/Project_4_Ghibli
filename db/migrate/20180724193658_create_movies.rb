class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :image
      t.string :director
      t.string :producer
      t.integer :release_date
      t.integer :rating
      t.string :people, array: true, default: []
      t.string :specie, array: true, default: []
      t.string :location, array: true, default: []
      t.string :vehicle, array: true, default: []

      t.timestamps
    end
  end
end
