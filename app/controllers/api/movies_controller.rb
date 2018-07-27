class Api::MoviesController < ApplicationController
    before_action :authenticate_user!

    def index
      @movies = current_user.movies
  
      render json: @movies
    end
  
    def show
      @movie = Movie.find(params[:id])
  
      render json: @movie
    end
  
    def create
      @user = current_user
      @movie = @user.movies.build(movie_params)
  
      if @user.save
        render json: @movie, status: :created, location: @movie
      else
        render json: @movie.errors, status: :unprocessable_entity
      end 
    end
  
    def update
      @movie = Movie.find(params[:id])
  
  
      if @movie.update(movie_params)
        render json: @movie
      else
        render json: @movie.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user = current_user
      @movie = Movie.find(params[:id]).delete
  
      render status: :ok
    end
  
    private
  
    def movie_params
      params.require(:movie).permit(:title, :image, :director, :producer, :release_date, :rating, :description).merge(user_id: current_user.id)
    end
end
