import { onRequestGet as __api_article___id___js_onRequestGet } from "/Users/bertcherry/repos/cherry-coaching/functions/api/article/[[id]].js"
import { onRequestGet as __api_video___id___js_onRequestGet } from "/Users/bertcherry/repos/cherry-coaching/functions/api/video/[[id]].js"
import { onRequestGet as __api_articles_js_onRequestGet } from "/Users/bertcherry/repos/cherry-coaching/functions/api/articles.js"

export const routes = [
    {
      routePath: "/api/article/:id*",
      mountPath: "/api/article",
      method: "GET",
      middlewares: [],
      modules: [__api_article___id___js_onRequestGet],
    },
  {
      routePath: "/api/video/:id*",
      mountPath: "/api/video",
      method: "GET",
      middlewares: [],
      modules: [__api_video___id___js_onRequestGet],
    },
  {
      routePath: "/api/articles",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_articles_js_onRequestGet],
    },
  ]