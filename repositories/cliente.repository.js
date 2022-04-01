import { Clientes } from "../utils/Sequelize.js";
import fetch  from 'node-fetch';

export class clienteRepository{
    constructor(cpf){
        this.cpf = cpf
    }
    async getEndereco(CEP){
        try{
            let enderecoCompleto = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
            enderecoCompleto = enderecoCompleto.json()
            return enderecoCompleto;
        }catch(error){
            return {};
        }
    }

    async getCliente(){
        return await Clientes.findOne({where:{CPF:this.cpf}});
    }

    async setCliente({CEP, dataNascimento,CPF,email,nome}){
        try{
            const enderecoCompleto = await this.getEndereco(CEP)
            if(enderecoCompleto !== {}){
                const [novoCliente, created] = await Clientes.findOrCreate({
                    where:{CPF:CPF},
                    defaults:{
                        Endereco: enderecoCompleto.logradouro,
                        Cidade:enderecoCompleto.localidade,
                        Estado:enderecoCompleto.uf,
                        CEP:CEP,
                        Nome:nome,
                        Email:email,
                        CPF:CPF,
                        DataNascimento:new Date(dataNascimento) //String do tipo AAAA-MM-DD
                    }
                })

                if(created){
                    return 200
                }
                return 500
                
            }else{
                return 500
            }

        }catch(error){
            return 500
        }
    }   
}

