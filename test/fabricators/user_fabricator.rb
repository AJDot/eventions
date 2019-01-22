Fabricator(:user) do |f|
  first_name {Faker::Name.first_name.gsub(/[' ]/, '')}
  last_name {Faker::Name.last_name.gsub(/[' ]/, '')}
  email { |attrs| "#{attrs[:first_name]}@#{attrs[:last_name]}.com" }
  password {'Ta123456'}
end