const mongoose = require("mongoose")

const user_schema = new mongoose.Schema({
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true}
    },
    { collection: "users" }
)

const model = mongoose.model("userSchema", user_schema)

module.exports = model