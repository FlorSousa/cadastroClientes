import nodemailer from "nodemailer"
export class EmailService{
    constructor(nomeRemetente,emailRemetente, passRemetente, emailDestino){
        this.emailRemetente = emailRemetente;
        this.emailDestino = emailDestino;
        this.passRemetente = passRemetente;
        this.nomeRemetente = nomeRemetente;
        this.transporter = null;
        this.mensagem = null;
        this.assunto;
    }
    
    criaConexao(){
        this.transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:465,
                secure:true,
                auth:{
                    user:this.emailRemetente,
                    pass:this.passRemetente
                }
            })
    }

    setMensagem(assunto,mensagem){
        this.mensagem = mensagem
        this.assunto = assunto
    }

    getRemetente(){
        return `${this.nomeRemetente} ${this.emailRemetente}`
    }

    enviaEmail(){
        this.transporter.sendMail({
            from:this.getRemetente(),
            to:this.emailDestino,
            subject:this.assunto,
            text:this.mensagem,
        })
    }
} 