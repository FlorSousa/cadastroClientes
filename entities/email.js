import { EmailService } from "../services/emailService";

export class Email{
    constructor(){
        this.emailService = new EmailService();
    }
}