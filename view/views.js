import express from 'express';
import dotenv from 'dotenv'
import {Cliente} from "../entities/cliente.js"
import { Email } from '../entities/email.js';

dotenv.config()
const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get("/clientes/cpf/:cpf", async (req,res)=>{
    try{
        let cpf = req.params.cpf;
        const cliente = new Cliente(cpf)
        let dadosCliente = await cliente.getCliente()
        dadosCliente = dadosCliente == null ? 404 : dadosCliente
        res.send(dadosCliente)

    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
})

app.post("/clientes/mensagem/", async (req,res)=>{
    try{ 
        const contato = {
            assunto: req.body.assunto != undefined ? req.body.assunto : "",
            mensagem: req.body.mensagem,
            cpf: req.body.CPF
        }
        try{
            const cliente = new Cliente(contato.cpf);
            let dadosCliente = await cliente.getCliente() 
            if(dadosCliente !== null){
                let emailCliente = await dadosCliente.Email;
                const email = new Email(process.env.NOME_EMAIL,process.env.EMAIL_DEFAULT,process.env.PASS_DEFAULT,emailCliente);
                try{
                    email.criaConexao();
                    email.setMensagem(contato.assunto,contato.mensagem);
                    email.enviaEmail();
                }catch(error){
                    return res.sendStatus(500)
                }
                return res.send(200)
            }
            return res.send(404)
            
        }catch(error){
            res.sendStatus(500)
        }
        

    }catch(error){
        res.sendStatus(500)

    }
})

app.post("/clientes/cadastro", async (req,res)=>{
    try{
        const novoCliente = {
            CEP : req.body.CEP,
            dataNascimento : req.body.dataNascimento,
            CPF : req.body.CPF,
            email : req.body.email,
            nome : req.body.nome,
        };
        const cliente = new Cliente(novoCliente.CPF);
        let resp = await cliente.setCliente(novoCliente);
        res.send(resp)

    }catch(error){
        res.sendStatus(500)
    }
})

app.listen(3000)