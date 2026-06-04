const express = require("express");

const sequelize = require('./models/database.js');
require('./models/associations');

const ExpenseRouter = require('./router/expense.js');
const UserRouter = require('./router/user.js');
const CategoryRouter = require('./router/category.js');

const app = express();

app.use(express.json());

app.use('/api', ExpenseRouter);
app.use('/api', UserRouter);
app.use('/api', CategoryRouter);

async function main() {
  try {
    console.log('Iniciando conexão com o banco de dados...');
    await sequelize.authenticate();
    console.log('Autenticação com sucesso!');
    
    await sequelize.sync({ force: false });
    console.log('Sincronização com banco de dados realizada.');
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    const server = app.listen(1080, () => {
      console.info(`✅ Servidor rodando na porta 1080`);
    });

    server.on('error', (error) => {
      console.error('❌ Erro no servidor:', error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
    console.error('Stack:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejection não tratada:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Exceção não capturada:', error);
  process.exit(1);
});

main();
