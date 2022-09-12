#set -e
export $(grep -v '^#' .env | xargs)
npx squid-typeorm-codegen
npm run build
rm -rf db/migrations/*.js
npx docker-compose down
sleep 3
echo $DB_PORT
echo $DB_USER
npx docker-compose up -d
sleep 5
npx squid-typeorm-migration generate
npx squid-typeorm-migration apply