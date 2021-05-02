Migrations

gen
yarn run typeorm migration:generate -n initial -f src/config/ormconfig.json

run
yarn run typeorm migration:run -f src/config/ormconfig.json