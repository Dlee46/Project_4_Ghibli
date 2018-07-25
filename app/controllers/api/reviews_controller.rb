class Api::ReviewsController < ApplicationController
    before_action :authenticate_user!

  def index
    @reviews = Review.find(params[:movie_id]).reviews

    render json: @reviews
  end

  def show
    @review = Review.find(params[:id])

    render json: @review
  end

  def create
    @user = current_user
    @review = @user.reviews.build(review_params)

    if @user.save
      render json: @review, status: :created, location: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
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
    params.require(:review).permit(:title, :review)
  end
end

