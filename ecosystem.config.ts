module.exports = {
    apps: [
      {
        name: 'app',
        script: './src/app.ts',
        interpreter: 'ts-node',
        watch: true,
        env: {
          PORT: process.env.PORT || 4000, 
        },
        instances: 'max',
        exec_mode: 'cluster',
      },
    ],
  };
  