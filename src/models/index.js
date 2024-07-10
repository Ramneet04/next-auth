const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User