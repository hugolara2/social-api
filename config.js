module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD, 
    database: process.env.MYSQL_DB
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_HOST
  },
  post: {
    port: process.env.POST_PORT || 3002,

  },
  cacheService: {
    port: process.env.CACHE_SRV_PORT || 3003,
    host: process.env.MYSQL_HOST 
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PWD
  }
};