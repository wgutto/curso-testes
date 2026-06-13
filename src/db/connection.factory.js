import knex from 'knex';
export function criaConexaoDB(config) {
  console.debug(`Criando conexão com o banco de dados ${config.connection}...`);
  const connection = knex(config);

  connection.raw('SELECT 1')
  .then(() => console.log('Banco conectado'))
  .catch(err => console.error('Erro banco:', err));

  connection[Symbol.dispose] = () => {
    console.log('Fechando conexão com o banco de dados...');
    return connection.destroy();
  };

  return connection;
}
