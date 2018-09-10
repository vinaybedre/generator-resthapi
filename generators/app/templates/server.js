let Hapi = require('hapi')
let mongoose = require('mongoose')
let RestHapi = require('rest-hapi')
require('dotenv-safe').config()

async function api() {
  try {
    let server = Hapi.Server({ port: process.env.PORT })

    let config = {
      appTitle: "<%= appTitle %>",
      version: "<%= version %>",
      mongo: {
        URI: process.env.MONGO_URL
      }
    };

    await server.register({
      plugin: RestHapi,
      options: {
        mongoose,
        config
      }
    })

    await server.start()

    console.log("Server ready", server.info)

    return server
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api()