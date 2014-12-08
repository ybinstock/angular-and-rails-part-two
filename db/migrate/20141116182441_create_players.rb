class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.boolean :winner, default: false
      t.integer :rating, default: 5

      t.timestamps
    end
  end
end
