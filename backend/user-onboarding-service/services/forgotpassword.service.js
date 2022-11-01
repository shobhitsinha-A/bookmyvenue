const db = require("../db/db");
const bcrypt = require("bcryptjs");

const updatePassword = async function (user_name, password) {
    bcrypt
        .hash(password, 10)
        .then((hash) => {
            const reset = db("users")
                .where({
                    user_name: user_name,
                })
                .update("e_pass", hash);

            return reset;
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = { updatePassword };