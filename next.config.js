const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    mode: 'production',
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