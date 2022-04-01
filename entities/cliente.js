import {clienteRepository} from "../repositories/cliente.repository.js"

export class Cliente{
    constructor(CPF){
        this.ClienteRepository = new clienteRepository(CPF);
    }
    async getCliente(){
        let dadosCliente =  await this.ClienteRepository.getCliente();
        return dadosCliente
    }
    setCliente({CEP, dataNascimento,CPF,email,nome}){
        return this.ClienteRepository.setCliente({CEP, dataNascimento,CPF,email,nome})
    }

    mensagemCliente(){
        let emailCliente = this.getCliente().email; 
    }
    
}

