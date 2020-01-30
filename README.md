# Tech Tracking
API de aplicação que permite fazer o "check-in" na tecnologia que o usuário cadastrado mais utilizou durante o dia.

## Rotas

### /users

Retorna todos os usuários cadastrados na aplicação, com os campos:

* _id (Identificador único)
* nome (String entre 3 e 50 caracteres; obrigatório)
* sobrenome (String entre 3 e 50 caracteres; obrigatório)
* email (String entre 6 e 100 caracteres; obrigatório)
* senha (String entre 6 e 52 caracteres; obrigatório)

### /users/id

Retorna um usuário específico

### /techs

Retorna as tecnologias cadastradas, com os campos:

* _id,
* techname (String)

### /techs/id

Retorna uma tecnologia específica
