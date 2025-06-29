module.exports = {
  apps: [
    {
      name: "wasiqr",
      script: "./wasiqr.js",
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
