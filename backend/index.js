const express = require('express');
const moongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const UserRouter = require("./routes/users");
const MovieRouter = require("./routes/movie");
const app = express();
dotenv.config();


moongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected ")
}).catch((err) => {
    console.log(err);
})


app.use(express.json());



app.use("/api/auth", authRouter);
app.use("/api/users/", UserRouter);
app.use("/api/movies/", MovieRouter);

app.listen(3000, () => {
    console.log("Server is Running ");
})