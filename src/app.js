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
app.use(cors());


import clientrouter from "./router/client.router.js";
import docsrouter from "./router/docs.router.js";
import sharerouter from "./router/share.router.js";
import offlinedoc from "./router/offlinedoc.router.js";

app.use("/api/v1/client", clientrouter);
app.use("/api/v1/docs", docsrouter);
app.use("/api/v1/share", sharerouter);
app.use("/api/v1/offline", offlinedoc);

export {app}