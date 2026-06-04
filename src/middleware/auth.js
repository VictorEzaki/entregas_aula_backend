const jwt = require('jsonwebtoken');
const authConfig = require('./../config/auth');

module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não informado' });
    }

    const [scheme, token] = authHeader.split(' ');
    
    // Bearer T0K3N-1234567890
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret);
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        // Se o token for válido, o usuário é autenticado e pode acessar as rotas protegidas

        // Identificar a rota e o método HTTP para aplicar regras de autorização
        
        // não utilizo role na minha API, mas deixei comentado para caso queira utilizar futuramente
        // const method = req.method;
        // const path = req.path;

        // if (path.startsWith('/users') && req.user.role !== 'admin') {
        //     return res.status(403).json({ error: 'Acesso negado: apenas administradores podem acessar esta rota' });
        // }

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};