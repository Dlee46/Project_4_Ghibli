class Api::ReviewsController < ApplicationController
    before_action :authenticate_user!

  def index
    @reviews = Movie.find(params[:movie_id]).reviews

    render json: @reviews
  end

  def show
    @review = Review.find(params[:id])

    render json: @review
  end

  def create
    @user = current_user
    @movies = @user.movies.find(params[:movie_id])
    @review = @movies.reviews.create!(review_params)

    render json: @review
  end

  def update
    @review = Review.find(params[:id])


    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @review = Review.find(params[:id]).delete

    render status: :ok
  end

  private

  def review_params
    params.require(:review).permit(:title, :comment).merge(user_id: current_user.id)
  end
end

