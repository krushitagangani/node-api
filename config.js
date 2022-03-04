const env = process.env;
const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'language_management',
    }
  };
  

  module.exports = config;