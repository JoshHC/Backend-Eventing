import jwt from 'jsonwebtoken';

const Authenticate = (req, res, next) => {
    try{
        console.log(req)
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'valorsecreto')
        req.user = decode
        next()
    }
    catch(error)
    {
        res.status(400).json({
            message: 'Fallo en la autenticación'
        })
    }
}

export default Authenticate