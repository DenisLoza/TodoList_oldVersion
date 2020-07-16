module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    //  добавляем объект с опциями для TypeScript
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.tsx?$/],
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80, singleQuote: false,
            options: {parser: "typescript"}
          },
        },
      },
    }
  ],
};
