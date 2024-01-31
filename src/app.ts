import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import proxy from "express-http-proxy";
import { proxyResolver } from "./helpers";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const authProxy = proxy(process.env.AUTH_SERVICE_URL as string, {
  proxyReqPathResolver: proxyResolver,
  limit: "20mb",
});
const allowedOrigins = [
  conf.urls.authService,
  conf.urls.cardService,
  conf.urls.accountService,
  conf.urls.client,
];
const corsOptions: CorsOptions =
  process.env.NODE_ENV === "development"
    ? {
        credentials: true,
        origin: true,
      }
    : {
        credentials: true,
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      };
app.use(cors(corsOptions));
app.use("/auth", authProxy);

export default app;
