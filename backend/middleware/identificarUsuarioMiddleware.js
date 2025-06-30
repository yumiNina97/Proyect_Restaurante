const jwt = require('jsonwebtoken');

const identificarUsuario = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (!err) {
            req.usuario = usuario;
        }
        next();
    });
};

module.exports = { identificarUsuario };