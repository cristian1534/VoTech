module.exports = {
    apps: [
      {
        name: 'app',
        script: './src/app.ts',
        instances: 1,
        watch: true,
        env: {
          PORT: 4000,
        },
      },
    ],
  };
  