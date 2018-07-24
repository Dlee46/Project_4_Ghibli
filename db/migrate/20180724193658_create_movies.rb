class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :image
      t.string :director
      t.string :producer
      t.integer :release_date
      t.integer :rating
      t.string :people
      t.string :specie
      t.string :location
      t.string :vehicle

      t.timestamps
    end
  end
end
