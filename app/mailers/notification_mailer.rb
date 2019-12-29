class NotificationMailer < ApplicationMailer
  def return_notify(receiver, sender, message)
    @receiver = receiver
    @sender = sender
    @message =  message

# binding.pry
    mail(to: @receiver.email,
        subject: "#{@sender.username} Recommand New Tool",
        reply_to: @sender.email
    )
  end
end
