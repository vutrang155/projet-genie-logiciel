const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const errorHandler = require('./middleware/errorHandler')
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

//db
const connectDB = require('./config/database');
connectDB();

const routes = require('./routes/routes.js');
const authRoutes = require("./routes/login");

const tacheRoutes = require("./routes/tache");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use('/api',routes);
app.use('/auth',authRoutes);

app.use('/tache',tacheRoutes);



app.use(errorHandler);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue Sur NODEJS" });
});
