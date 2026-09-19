(ns saiban.state
  (:require [reagent.core :as reagent]))

;; App surface metadata mirroring the declared appview identity (untrusted
;; source data, read-only): title/project/kind/routeCount/routes/vars/xrpc.
(defonce app-meta
  (reagent/atom {:title "Saiban Sb4n0j1c"
                 :project "etzhayyim-project-saiban"
                 :name "etzhayyim-wasm-saiban-sb4n0j1c"
                 :kind "appview"
                 :route-count 1
                 :routes ["sb4n0j1c.etzhayyim.com/*"]
                 :vars ["AGENTGATEWAY_MCP_ROUTER_URL"
                        "APP_ACTOR_HANDLE"
                        "APP_CAPABILITIES"
                        "APP_DESCRIPTION"
                        "APP_DISPLAY_NAME"
                        "APP_EMBED_URL"
                        "APP_FRAMEWORK"
                        "APP_NANOID"
                        "APP_PERFORMER_TYPE"
                        "APP_UI_TYPE"]
                 :xrpc true
                 :relative-path "appview/etzhayyim-wasm-saiban-sb4n0j1c/cljs/src/saiban/desktop.cljs"}))

(defn app-meta-value [k]
  (get @app-meta k))
