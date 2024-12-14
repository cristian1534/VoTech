module.exports = {
    apps: [
      {
        name: 'app',
        script: './src/app.ts',
        instances: 1,
        env: {
          PORT: 4000,
        },
      },
    ],
  };
  