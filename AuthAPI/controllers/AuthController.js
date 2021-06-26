import dynamoClient from '../config/db.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const Register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
            return;
        }
        let user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: hashedPass
        }

        const params = {
            TableName: process.env.TABLE_NAME,
            Item: user,
        };
        return dynamoClient.put(params, (err, data) => {
            if (err) {
                return res.json({ message: 'Ha ocurrido un error' }).status(500);
            } else {
                return res.json({ message: 'Usuario añadido exitosamente' }).status(200);
            }
        });
    })
}

const Login = async (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    // Get the user
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            "email": username
        },
    };
    const response =  await dynamoClient.get(params).promise();
    const user = response.Item
    
    // password check
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                res.json({
                    error: err
                })
                return;
            }

            if (result) {
                let token = jwt.sign({ name: user.name }, 'valorsecreto', { expiresIn: '1h' })
                res.json({
                    message: 'Inicio de Sesión Exitoso', token
                })
                return;
            } else {
                res.status(401).json({
                    message: 'La contraseña es inválida'
                })
                return;
            }
        })
    } else {
        res.status(400).json({
            message: 'Usuario no encontrado'
        })
        return;
    }
}

const checkToken = (req, res, next) => {
    res.status(200).json({
        message: 'Token valido'
    })
}

const AuthController = {
    Register, Login, checkToken
}

export default AuthController