// cors.middleware.ts
import { CorsOptions, CorsOptionsDelegate } from "cors";
import config from "../config/index";

export const customCors: CorsOptions | CorsOptionsDelegate = {
  origin: (origin, callback) => {
    console.log("origin", origin);

    // Permitir solicitudes desde localhost (puedes ajustar el puerto según tu caso)
    if (origin && origin.includes("localhost:")) {
      return callback(null, true);
    }

    // Permitir solicitudes desde Postman (o cualquier otra herramienta de desarrollo local)
    if (origin === undefined) {
      return callback(null, true);
    }
    if (!origin || !origin.includes(config.urls.permited as any)) {
      return callback(new Error("Not allowed by CORS"));
    }
    callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
