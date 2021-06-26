import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
            return;
        }

        let user = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: hashedPass
        })

        user.save()
            .then(user => {
                res.json({
                    message: 'Usuario añadido exitosamente'
                })
                return;
            })
            .catch(error => {
                res.json({
                    message: 'Ha ocurrido un error'
                })
                return;
            })

    })
}

const Login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }] })
        .then(user => {
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
        })
}

const AuthController = {
    Register, Login
}


export default AuthController