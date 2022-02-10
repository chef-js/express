const { default: startServer } = require("./dist");

module.exports = async function start(config) {
  return await startServer({
    ...config,
    type: "express",
  });
};
