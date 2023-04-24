const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admis");
const authRouter = require("./routes/auth");
const podcastRouter = require("./routes/podcasts");
const userRouter = require("./routes/user");

const PORT = 3000;
const DB = "mongodb://127.0.0.1:27017";
const app = express();
app.set('port',(process.env.PORT || 5000));
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(podcastRouter);
app.use(userRouter);

mongoose.set("strictQuery", false);
mongoose.connect(DB).then(()=>{
    console.log("connection successful");
}).catch((e) => {
    console.log(e);
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Connected at Port ${PORT}`);
})