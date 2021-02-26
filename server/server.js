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
const userRoutes = require("./routes/user");
const tacheRoutes = require("./routes/tache");
const projetRoutes = require("./routes/projet");
const clientRoutes = require('./routes/ClientRoutes');
const contactRoutes = require('./routes/ContactRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use('/api',routes);

app.use('/api/user',userRoutes);
app.use('/api/projet',projetRoutes);
app.use('/api/tache',tacheRoutes);
app.use('/client',clientRoutes);
app.use('/contact',contactRoutes);

app.use(errorHandler);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue Sur NODEJS" });
});
