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
app.use("/user",require("./routes/userRoutes.js"));
app.use("/auth",require("./routes/authRoutes.js"));
app.use("/form",require("./routes/formRoutes.js"));
app.use("/studentForm",require("./routes/studentformRoutes.js"));
app.use("/defaultWorkflow",require("./routes/defaultWorkflow.js"));
app.use("/admin",require("./routes/adminRoutes.js"));
app.use("/parent",require("./routes/parentRoutes.js"));
app.use("/therapist",require("./routes/therapistRoutes.js"));
app.use("/report",require("./routes/reportRoutes.js"));
app.use("/workflow",require("./routes/workflow.js"))
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))