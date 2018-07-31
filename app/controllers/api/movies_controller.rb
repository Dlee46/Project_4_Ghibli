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
      @movie = @user.movies.create!(movie_params)
      render json: @movie
 
    end

    def update
      @user = current_user
      @movie = @user.movies.find(params[:id])
  
  
      if @movie.update!(movie_params)
        render json: @movie
      else
        render json: @movie.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user = current_user
      @movie = Movie.find(params[:id]).destroy
  
      render status: :ok
    end
  
    private
  
    def movie_params
      params.require(:movie).permit(:title, :image, :director, :producer, :release_date, :rating, :description, :people, :specie, :location, :vehicle)
    end
end
