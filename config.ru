require 'rubygems'
require 'open-uri'
require 'sinatra'

mime_type :coffee, "text/coffeescript"
set :public_folder, File.dirname(__FILE__) + '/public'
set :root, File.dirname(__FILE__) + '/'
get '/' do
  open(File.dirname(__FILE__) + '/public/index.html').read
end

get '/b' do
  open(params[:url]).read
end

run Sinatra::Application
