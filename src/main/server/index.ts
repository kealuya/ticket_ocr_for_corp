/* eslint-disable prefer-promise-reject-errors */
import app from "./server";
import { BuiltInServerPort } from "../config/const";
import { createServer, Server } from "http";
const port = BuiltInServerPort;

class SingleServer {
  constructor(app: any) {
    app.set("port", port);
    this.server = createServer(app);
    this.server.keepAliveTimeout = 0;
    this.server.on("connection", (socket) => {
      // keep-alive 1s后自动关闭
      socket.setTimeout(1000);
    });
  }
  server: Server;
  statrServer() {
    return new Promise((resolve: (value: string) => void, reject) => {
      try {
        this.server.listen(port);
        resolve("服务端已经启动");
      } catch (error) {
        switch (error.code) {
          case "ERR_SERVER_ALREADY_LISTEN":
            resolve("服务端已经启动");
            break;
          case "EACCES":
            reject("权限不足内置服务器启动失败，请使用管理员权限运行。");
            break;
          case "EADDRINUSE":
            reject("内置服务器端口已被占用，请检查。");
            break;
          default:
            reject(error);
        }
      }
    });
  }
  stopServer() {
    return new Promise((resolve: (value: string) => void, reject) => {
      this.server.close((err) => {
        if (err) {
          switch ((err as any).code) {
            case "ERR_SERVER_NOT_RUNNING":
              resolve("服务端未启动");
              break;
            default:
              reject(err);
          }
        } else {
          resolve("服务端已关闭");
        }
      });
    });
  }
}

const singleServer = new SingleServer(app);

export default {
  StatrServer() {
    return singleServer.statrServer();
  },
  StopServer() {
    return singleServer.stopServer();
  },
};
