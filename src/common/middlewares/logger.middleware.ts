import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  // Формирование объекта для добавление в лог iisnode
  const bodyForLog = {
    timestamp: new Date(),
    request: {
      method: req.method,
      url: req.url,
      params: req.params,
      query: req.query,
      body: req.body,
      user: req.headers['user'],
      userAgent: req.headers['user-agent']
    },
  };
  console.log(bodyForLog);
  next();
}
