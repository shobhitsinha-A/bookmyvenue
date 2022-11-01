// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'bmv',
      user:     'root',
      password: 'bookmyvenue'
    },
    pool: {
      min: 2,
      max: 10
    }
  
  }
};
