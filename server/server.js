const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbCon } = require("./configs/dbCon");
const { userRouter } = require("./router/userRouter");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
// Database Connection
const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.CYBERNET_DB
    : process.env.LOCAL_DB;

dbCon(dbURI)
  .then(() => console.log("🟢 Connected to Database"))
  .catch((err) => {
    console.error("🔴 Database connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Allowed Domains for CORS
const allowedDomains =
  process.env.NODE_ENV === "production"
    ? [process.env.REMOTE_CLIENT_APP, process.env.REMOTE_SERVER_API]
    : [process.env.LOCAL_CLIENT_APP, process.env.LOCAL_SERVER_API];

app.use(
  cors({
    origin: allowedDomains,
  })
);

// API Routes

// Endpoint for testing connection
app.get("/api", (req, res) => {
  res.send("Hello from Node.js and MongoDB!");
});

// Start the Server
const port = process.env.PORT || 5000; // Set default port if not specified
app.listen(port, () => {
  const currentURL =
    process.env.NODE_ENV === "production"
      ? process.env.REMOTE_URL
      : process.env.LOCAL_URL;

  console.log(`🟢 Server running at ${currentURL}`);
});
