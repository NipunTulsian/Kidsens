const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser")
const connectDB=require("./config/setupdb.js")
require("./config/setupdb")
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("../uploads"));
app.use("/",require("./routes/userRoutes.js"));
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))