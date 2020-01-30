
const settingAuth = require('../settings/auth');

// função que válida o token da requisição
module.exports = (request, response, next) => {

    // token de autorização
    const authHeader = request.headers.authorization;

    // verifica se há um token na requisição
    if(!authHeader) {
        return response.status(401).json({ message: "Token de autorização não encontrado" });
    }

    // Formato do token:  Bearer xxxxxxxxxxxxxxxx.xxxxxxxxxxxx.xxxxxxxxxxxx
    const fullToken = authHeader.split(' ');  
    //    [ Format, Key ]
    const [ tokenFormat , tokenKey ] = fullToken;

    if( !fullToken.length == 2) {
        return response.status(401).json({ message: "Formato do token está inválido" });
    }

    // Verifica o token utiliza o formato Bearer
    if(!/^Bearer$/i.test(tokenFormat)) {
        return response.status(401).json({ message: "Formato do token está inválido" });
    }

    const jwt = require('jsonwebtoken');

    // válida o token
    jwt.verify(tokenKey, settingAuth.secret, (err, decode) => {
        if(err) {
            return response.status(401).json({ message: "Token está inválido" });
        }

        // Token está válido
        request.userId = decode.id;
        // Continua a requisição
        return next();
    });

    


}