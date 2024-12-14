module.exports = {
    apps: [
      {
        name: 'app',
        script: './src/app.ts',
        interpreter: 'ts-node', 
        instances: 1, 
        exec_mode: 'cluster', 
        env: {
          NODE_ENV: 'production', 
          PORT: process.env.PORT || 4000,
        },
      },
    ],
  };
  