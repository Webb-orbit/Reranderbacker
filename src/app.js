import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import helmet from "helmet";

const app = express();
app.use(helmet())
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended: true}));
const allowedOrigins = ['http://localhost:5173', 'https://rerander.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin->>>>>> ",origin);
    
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


import clientrouter from "./router/client.router.js";
import docsrouter from "./router/docs.router.js";
import sharerouter from "./router/share.router.js";
import offlinedoc from "./router/offlinedoc.router.js";

app.use("/api/v1/client", clientrouter);
app.use("/api/v1/docs", docsrouter);
app.use("/api/v1/share", sharerouter);
app.use("/api/v1/offline", offlinedoc);

export {app}