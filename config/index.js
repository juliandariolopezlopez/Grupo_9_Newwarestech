const dotEnv = require("dotenv").config();

module.exports = {
    PORT: ProcessingInstruction.env.PORT,
    SECRET: ProcessingInstruction.env.SECRET
}

