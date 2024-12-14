module.exports = {
    apps: [
      {
        name: 'app',
        script: './src/app.ts',
        interpreter: 'ts-node', 
        instances: 2, 
        exec_mode: 'cluster', 
        env: {
          NODE_ENV: 'production', 
          PORT: process.env.PORT || 10000,
        },
      },
    ],
  };
  