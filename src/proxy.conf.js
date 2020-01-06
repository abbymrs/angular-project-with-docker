const PROXY_CONFIG = [
  {
    context: ["/user", "/tenant"],
    target: "http://172.26.128.17:8888",
    secure: false
  },
  {
    context: ["/multimediatest"],
    target: "http://172.26.128.59:9090",
    secure: false
  },
  {
    context: ["/batch-job"],
    target: "",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
