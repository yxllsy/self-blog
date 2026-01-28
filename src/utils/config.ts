interface Config {
  oauth_uri: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
}
const config: Config = {
  oauth_uri: "",
  redirect_uri: "",
  client_id: "",
  client_secret: ""
};

// 本地开发环境下 （如下的信息在本地开发可以当测试用）
if (import.meta.env.MODE === "development") {
  config.redirect_uri = "/api/login";
  config.client_id = "";
  config.client_secret = "";
}
export default config;
