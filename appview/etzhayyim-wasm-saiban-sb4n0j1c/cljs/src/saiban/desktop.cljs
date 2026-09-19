(ns saiban.desktop
  (:require [reagent.dom :as rdom]
            [saiban.ui :as ui]))

(defn ^:export init! []
  (rdom/render [ui/root-view] (js/document.getElementById "app")))
