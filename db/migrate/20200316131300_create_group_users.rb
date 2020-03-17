class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_kye: true
      t.references :user, foreign_kye: true
      t.timestamps
    end
  end
end
