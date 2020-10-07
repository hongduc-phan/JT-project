const path = require('path');

const root = path.resolve(__dirname, '../../');

const config = {
  webpackConfig: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig-styleguidist.json',
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: 'file-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  sections: [
    {
      name: 'Icons',
      content: path.resolve(root, 'src/components/Icons/Icons.md'),
    },
    {
      name: 'Components',
      components: path.resolve(root, 'src/components/**/*.{ts,tsx}'),
    },
  ],
  ignore: [
    '**/Icons/**',
    '**/types.ts',
    '**/types.tsx',
    '**/index.ts',
    '**/index.tsx',
    '**/*.spec.js',
    '**/*.spec.jsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.test.tsx',
    '**/*.test.ts',
    '**/*.test.js',
    '**/*.test.jsx',
    '**/Table/TableBody/**',
    '**/Table/TableCell/**',
    '**/Table/TableHead/**',
    '**/Table/TableRow/**',
    '**/Table/TableContext.tsx',
    '**/Sidebar/SidebarMenuItem/**',
    '**/Sidebar/SidebarMenu/**',
    '**/Sidebar/SidebarButton/**',
    '**/Sidebar/SidebarTitle/**',
    '**/Popover/**',
    '**/Portal/**',
    '**/Select/**',
    '**/Sidebar/SidebarLogo/**',
  ],
  styleguideComponents: {
    Wrapper: path.join(root, 'config/styleguide/Wrapper'),
  },
  propsParser: require('react-docgen-typescript').withCustomConfig(
    path.resolve(root, 'tsconfig.json'),
    {
      // propFilter: {
      //   skipPropsWithName: ['about'],
      //   skipPropsWithoutDoc: true,
      // },
      propFilter(prop) {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  ).parse,
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx');
    const dir = path.dirname(componentPath);
    return `import ${name} from '${dir}';`;
  },
  styleguideDir: path.resolve(root, 'build/docs'),
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Open Sans", sans-serif',
    },
  },
};

if (process.env.npm_lifecycle_event === 'test:visual:build') {
  config.showSidebar = false;
}

module.exports = config;
