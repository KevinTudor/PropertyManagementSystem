const mongoose = require("mongoose")
const express = require("express")
var methodOverride = require('method-override')
const app = express();
app.set('view engine', 'ejs');

const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();

// DB Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED")
}).catch(() => {
  console.log("UNABLE to connect to DB")
})

// Use parsing middleware
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser(process.env.SECRET))
app.use(cors())
app.use(methodOverride('_method'))
app.use(express.static(__dirname));

// Import the routes
const userRoutes = require("./routes/user")

// Using routes
app.use('/', userRoutes) 


const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
  console.log(`App is running at localhost:${port}`)
})