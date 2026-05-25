#!/usr/bin/env bash
set -o errexit

# Bundler
bundle install
# Yarn
yarn install
# Rails assets（ここでViteも実行される）
RAILS_ENV=production SKIP_CSS_BUILD=true NODE_ENV=production bundle exec rails assets:precompile
# MVPではDBを使用しないのでコメントアウト。本リリースで必要になったタイミングで外す
# bundle exec rails db:migrate
