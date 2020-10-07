const path = require('path');

module.exports = {
  url: `file://${path.resolve(__dirname, '../../build/docs/index.html')}`,
  dir: 'config/styleguide-visual/reference/',
  viewports: {
    desktop: {
      width: 600,
      height: 600,
      deviceScaleFactor: 2,
    },
  },
  launchOptions: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting medium',
      '--hide-scrollbars',
      '--enable-font-antialiasing',
      '--force-device-scale-factor=1',
      '--high-dpi-support=1',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    slowMo: 40,
  },
  navigationOptions: {
    waitUntil: 'networkidle0',
  },
};
