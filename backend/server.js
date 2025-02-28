const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnections");
require("dotenv").config(); 
connectDb();
const app = express();
const port = 5000;


app.use(express.json());

app.use("/api/donors", require("./routes/donorRoutes")); 
app.use("/api/recipients", require("./routes/recipientRoutes")); 
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler); //use it when ever using the middleware

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
