class Api::UsersController < ApplicationController

  def index
    @users = User.joins(:followers)
                .select("users.*, count(follows) as follower_count")
                .group("users.id")
                .order("follower_count DESC")
                .limit(5)
    render "api/users/index"
  end

  def show
    @user = User.find(params[:id])
    if @user
      render "api/users/show"
    end
  end

  def create
    @user = User.new(user_params)
    @user.profile_pic_url = "https://res.cloudinary.com/cloneinstagram/image/upload/v1495480689/dfkmka1kiru8b1x5fiog.jpg"
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user)
          .permit(:username, :password, :name, :bio, :profile_pic_url)
  end
end
