import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import merge from 'webpack-merge';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx', //
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', //
  ],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[name]__[local]--[hash:base64:5]' },

          // modules: true,
          // localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    const resolvePlugins = [
      // alias setting
      new TsconfigPathsPlugin(),
    ];

    // svg setting
    const svgRule = config.module?.rules?.find((rule) => {
      if (!rule) return false;

      if (typeof rule !== 'string' && rule?.test instanceof RegExp) {
        return rule.test.test('.svg');
      }
    });

    if (svgRule && typeof svgRule !== 'string') {
      svgRule.exclude = /\.svg$/;
    }

    const moduleRules = [
      // svg loader
      {
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: { icon: true },
          },
          'url-loader',
        ],
      },
      // react import
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ];

    return merge(config, {
      resolve: { plugins: resolvePlugins },
      module: { rules: moduleRules },
    });
  },
};

export default config;
