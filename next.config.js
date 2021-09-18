const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    mode: 'production',
    dest: "public",
    register: true,
    skipWaiting:false,
  },
  sassOptions : {
    includePaths: ['./components', './pages'],
    prependData: `
      @import "./styles/variables.scss";
      @import "./styles/mq.scss";
    `,
  }
});