import { EmailService } from "../services/emailService.js";

export class Email{
    constructor(nomeRemetente,emailRemetente, passRemetente, emailDestino){
        this.emailService = new EmailService(nomeRemetente,emailRemetente, passRemetente, emailDestino);
    }
    
    criaConexao(){
        this.emailService.criaConexao();
    }
    setMensagem(assunto, mensagem){
        this.emailService.setMensagem(assunto,mensagem);
    }
    enviaEmail(){
        this.emailService.enviaEmail();
    }
}