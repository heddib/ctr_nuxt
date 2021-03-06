module.exports = {
  mode: "universal",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  loading: { color: "#fff" },
  css: ["@/assets/css/main.css", "@/assets/css/main.scss"],
  plugins: [
    { src: "~/plugins/socket.client.js" },
    { src: "~/plugins/owl.js", ssr: false },
    { src: "~/plugins/sounds.js", ssr: false }
  ],
  buildModules: [],
  modules: ["@nuxtjs/pwa", "@nuxtjs/axios", "@nuxtjs/auth"],
  build: {
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  axios: {
    baseURL: "https://ctr-api.herokuapp.com/api",
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/v1/login",
            method: "post",
            propertyName: false,
          },
          user: { url: "/v1/user", method: "get", propertyName: false },
          logout: false,
        },
        tokenRequired: true,
        tokenType: "bearer",
        globalToken: true,
        autoFetchUser: false,
      },
    },
  },
};
