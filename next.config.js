const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  sassOptions : {
    includePaths: ['./components', './pages'],
    prependData: `
      @import "./styles/variables.scss";
      @import "./styles/mq.scss";
    `,
  }
});