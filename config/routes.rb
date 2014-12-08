Rails.application.routes.draw do
  resources :players

  root to: "raffler#index"
  match '*any' => "raffler#index", :via => [:get, :post]

end
