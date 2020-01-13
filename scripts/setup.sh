#!/usr/bin/env bash
cd "$(dirname "$0")"    # use script's location as working directory

#
# execute first-time setup procedures
#
# example:
#   /> ./setup.sh
#

# create config files for each enviroment from template
cp ../src/environments/environment.dev.template.ts ../src/environments/environment.dev.ts
cp ../src/environments/environment.prod.template.ts ../src/environments/environment.prod.ts
cp ../src/environments/environment.staging.template.ts ../src/environments/environment.staging.ts
cp ../src/environments/environment.test.template.ts ../src/environments/environment.test.ts
