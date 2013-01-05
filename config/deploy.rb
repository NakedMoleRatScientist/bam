set :application, "the-city"
set :repository, "file:///home/kiba/repos/bam"
set :local_repository, "git+ssh://bitcoinweekly.com/home/kiba/repos/bam"
set :deploy_to, "/home/kiba/projects/bam"
set :scm, :git
set :use_sudo, false
set :branch, "master"

server "bam-rtt.com", :app, :primary => true
