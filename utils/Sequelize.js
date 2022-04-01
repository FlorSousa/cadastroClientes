import {Sequelize, STRING, INTEGER, DATEONLY } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
})

export const Clientes = sequelize.define(process.env.TABLE_NAME, {
    Endereco: {
        type: STRING(100),
        allowNull: false

    },
    Cidade: {
        type: STRING(100),
        allowNull: false

    },
    Estado: {
        type: STRING(100),
        allowNull: false

    },
    CPF: {
        type: INTEGER(),
        allowNull: false
    },
    Email: {
        type: STRING(100),
        allowNull: false

    },
    CEP: {
        type: STRING(100),
        allowNull: false

    },
    Nome: {
        type: STRING(100),
        allowNull: false
    },
    DataNascimento:{
        type: DATEONLY(),
        allowNull: false
    }
})

Clientes.sync({force:true})
