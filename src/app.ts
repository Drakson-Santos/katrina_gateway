const express = require('express');
const app = express()

app.use(express.json())

require("./routes/test")(app)
require("./routes/katrina_users/users")(app)

export { app }
