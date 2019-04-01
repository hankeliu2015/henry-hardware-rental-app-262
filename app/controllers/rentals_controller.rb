class RentalsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def new
    @rental = Rental.new(tool_id: params[:tool_id])
  end

  def create
    # need a conditin to decide if the tool is available for rent before create new rental instance
    @tool = Tool.find_by(id: params[:tool_id])

    if @tool.available_for_rent? #rentals.available_to_rent? #where(return: false).empty? #count == 0

      rental = Rental.new(rental_params)
      rental.start_date = DateTime.strptime(params[:rental][:start_date], "%m/%d/%Y")
      rental.return_date = DateTime.strptime(params[:rental][:return_date], "%m/%d/%Y")
      rental.save
      redirect_to user_path(rental.user)
    else
      redirect_to root_path, {alert: "Sorry, this #{@tool.name} is curretly rented"}
    end
  end # end of method

  def update
    @rental = Rental.find_by(tool_id: params[:tool_id], user_id: current_user.id, return: false)

    @rental.update(return_date: Date.today, return: true)
    redirect_to user_path(current_user), {alert: "Thank you for return #{@rental.tool.name}. Here is the rental cost: $123456"}
  end

  private
  def rental_params
    params.require(:rental).permit(:user_id, :tool_id, :start_date, :return_date, :return)
  end
end
