const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("expense", "root", "", { dialect:"mysql" })

sequelize.sync({ force: false })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = sequelize