Rails.application.routes.draw do

  root to: "raffler#index"

  resources :players

# catch all routes to index.html. on the browser,
# we'll deal with formatting the right page with ng-view
  match '*path' => "raffler#index", :via => [:get, :post]
end
