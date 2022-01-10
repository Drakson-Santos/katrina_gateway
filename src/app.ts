const express = require('express');
const app = express()

app.use(express.json())

require("./routes/test")(app)

export { app }
