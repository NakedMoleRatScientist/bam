require "rvm/capistrano"
require "bundler/capistrano"

set :application, "Bam"
set :repository, "file:///home/kiba/repos/bam"
set :local_repository, "git+ssh://bitcoinweekly.com/home/kiba/repos/bam"
set :deploy_to, "/home/kiba/projects/bam"
set :scm, :git
set :use_sudo, false
set :app_server, "passenger"
set :branch, "master"

server "bam-rtt.com", :app, :primary => true

before "deploy:cold", 
    "deploy:install_bundler"

task :install_bundler, :roles => :app do
    run "type -P bundle &>/dev/null || { gem install bundler --no-rdoc --no-ri; }"
end
