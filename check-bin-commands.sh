#!/usr/bin/env bash

# We test if db-migrations bin scripts are OK, since they are used as npx commands
# from Jenkins Jobs MW.DB.OrmMigrations,
# and from test:setup-test-db script of microservices.

PACK=$(npm pack)
echo "$PACK"

npx -y --package=$PACK -- db-migrations-recreate-and-seed
npx -y --package=$PACK -- db-migrations-recreate-local-counter-generator
npx -y --package=$PACK -- db-migrations-check-foreign-key-data-types
npx -y --package=$PACK -- migrations-check -v
