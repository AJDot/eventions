if Rails.env.development? && Figaro.env.seed_dummy.present?
  show_result = -> (user) do
    display_result(user, "User[#{user.name}] created")
  end

  creating('Users')

  user = Fabricate.build(:user,
                         first_name: 'Alex',
                         last_name: 'Henegar',
                         email: 'alex@enovational.com',
                         password: 'Ta123456')
  user.save
  show_result.call(user)
  puts unless Figaro.env.show_details.present?
end