(ns saiban.ui
  (:require [reagent.core :as reagent]
            [saiban.state :as state]))

;; appkit.core is still src/appkit/core.cljk on main — invisible to
;; shadow-cljs 2.28.20, so this surface hand-rolls its structural chrome
;; (same class contract as kotoba-ui/core: :top/:facts/:panel) rather than
;; require a namespace shadow cannot resolve.

(defn chrome-section [label body]
  [:section {:class "panel"}
   [:h2 label]
   body])

(defn chips-list [keys]
  [:ul {:class "chips"}
   (for [k keys] [:li k])])

(defn facts-grid []
  [:section {:class "facts"}
   [:div [:span "Project"] [:strong (:project @state/app-meta)]]
   [:div [:span "Routes"] [:strong (:route-count @state/app-meta)]]
   [:div [:span "XRPC"]
    [:strong (if (:xrpc @state/app-meta) "enabled" "not configured")]]])

(defn routes-panel []
  (chrome-section "Public Routes"
    (if (seq (:routes @state/app-meta))
      [:ul (for [r (:routes @state/app-meta)] [:li r])]
      [:p {:class "muted"} "No public route is declared next to this app surface."])))

(defn vars-panel []
  (chrome-section "Runtime Bindings"
    (if (seq (:vars @state/app-meta))
      (chips-list (:vars @state/app-meta))
      [:p {:class "muted"} "No public vars are declared in the nearest wrangler config."])))

(defn source-panel []
  (chrome-section "Source"
    [:p (:relative-path @state/app-meta)]))

(defn top-section []
  [:section {:class "top"}
   [:p "Cloudflare appview"]
   [:h1 (:title @state/app-meta)]
   [:span (:name @state/app-meta)]])

(defn root-view []
  [:main
   [top-section]
   [facts-grid]
   [routes-panel]
   [vars-panel]
   [source-panel]])
