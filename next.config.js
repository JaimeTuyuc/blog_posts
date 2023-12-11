const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: '',
        mongodb_password: '',
        mongodb_clustername: '',
        mongodb_database: '',
      },
    }
  }
  return {
    env: {
      mongodb_username: '',
      mongodb_password: '',
      mongodb_clustername: '',
      mongodb_database: '',
    },
  }
}
