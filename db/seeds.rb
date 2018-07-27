# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Movie.destroy_all
Review.destroy_all

blah = User.create(
    email: "test@blah.com", 
    password: "blahblah", 
    password_confirmation: "blahblah")

movie1 = Movie.create(
    title: "Castle in the Sky", 
    description: "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.", 
    director: "Hayao Miyazaki", 
    producer: "Isao Takahata", 
    release_date: "1986", 
    rating: "95"
    )

review1 = blah.reviews.create(
    user_id:blah.id, 
    movie_id:movie1.id, 
    title: "Best Movie of the Year!",
    comment: "A Star Wars-like animated feature about a legendary city behind the clouds and the many secrets it holds about nature, robots, light, and magic."
    )