module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/capstone-g40-dev',
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/capstone-g40-test',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
