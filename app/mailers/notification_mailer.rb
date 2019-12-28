class NotificationMailer < ApplicationMailer
  def training_invite(receiver, sender, message)
    @receiver = receiver
    @sender = sender
    @message =  message
  end
end
