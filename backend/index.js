const express = require("express");
const { sequelize } = require("./config/db");
const { userRouter } = require("./routes/user")
require("dotenv").config();


const app = express();

app.use(express.json());
app.use("/user",userRouter);



app.get("/", async (req, res) => {
    try {
        res.send({ "msg": "Home page" });
    } catch (error) {
        res.send({ "msg": error.message });
    }
})


app.listen(process.env.PORT, async () => {
    try {
        sequelize.authenticate();
        sequelize
            .sync()
            .then(() => {
                console.log("Database & tables created!");
            })
            .catch((error) => {
                console.error("Error creating database tables:", error);
            });
        console.log("server is started...")
    } catch (error) {
        console.log(error.message);
    }
})