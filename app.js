// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT


// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

// REST API ROUTES
const answerRouter = require ('./routes/answer.routes')
app.use('/api', answerRouter)

const questionRouter = require('./routes/questions.routes')
app.use('/api', questionRouter)

// AUTH ROUTES
const authRouter = require("./routes/auth.routes");          
app.use("/auth", authRouter);   

const userRouter = require("./routes/User.routes");          
app.use("/api", userRouter);   



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

                       

module.exports = app;
