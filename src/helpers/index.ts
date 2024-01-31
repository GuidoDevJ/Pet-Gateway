import { Request, Response } from "express";

const proxyResolver = (req: Request, extra?: string | undefined): string => {
  console.log("Llegue al resolver");
  return "hola";
};
export { proxyResolver };
