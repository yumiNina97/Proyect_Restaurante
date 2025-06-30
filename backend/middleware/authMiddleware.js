const jwt = require('jsonwebtoken');

const protegerRuta = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }
//Metodo para verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.sendStatus(403); 
        }
        req.usuario = usuario; 
        next(); 
    });
};

module.exports = {
    protegerRuta,
};