set :rvm_ruby_string, 'ruby-1.9.3-p194@bam'
set :application, "Bam"
set :repository, "file:///home/kiba/repos/bam"
set :local_repository, "git+ssh://bitcoinweekly.com/home/kiba/repos/bam"
set :deploy_to, "/home/kiba/projects/bam"
set :scm, :git
set :use_sudo, false
set :app_server, "passenger"
set :branch, "master"

server "bam-rtt.com", :app, :primary => true

