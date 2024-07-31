const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log(err));

app.use("/tasks", require("./routes/tasksRoutes"));
app.use("/user", require("./routes/userCreate"));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})