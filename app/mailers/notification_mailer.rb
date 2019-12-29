class NotificationMailer < ApplicationMailer
  def return_notify(receiver, sender, message)
    @receiver = receiver
    @sender = sender
    @message =  message

    mail(to: @receiver.email,
        subject: "#{@sender.username} return reminder",
        reply_to: @sender.email
    )
  end
end
