Refer: https://knexjs.org/#Migrations

npx knex init --> creates knexfile.js

npx knex migrate:make migration_name --migrations-directory migrations --knexfile db/knexfile.js

To run the specified migration that has not yet been run

npx knex migrate:up 20220927192456_create_roles.js --knexfile ./db/knexfile.js
npx knex migrate:down 20220927192456_create_roles.js --knexfile ./db/knexfile.js

npx knex migrate:up 20220927191837_create_users.js --knexfile ./db/knexfile.js
npx knex migrate:down 20220927191837_create_users.js --knexfile ./db/knexfile.js

npx knex migrate:up 20220927192929_create_profiles.js --knexfile ./db/knexfile.js
npx knex migrate:down 20220927192929_create_profiles.js --knexfile ./db/knexfile.js

npx knex migrate:up 20221101040159_create_venues.js --knexfile ./db/knexfile.js
npx knex migrate:down 20221101040159_create_venues.js --knexfile ./db/knexfile.js

npx knex migrate:up 20221101060237_create_images.js --knexfile ./db/knexfile.js
npx knex migrate:down 20221101060237_create_images.js --knexfile ./db/knexfile.js

npx knex migrate:up 20221123201738_create_chats.js --knexfile ./db/knexfile.js
npx knex migrate:down 20221123201738_create_chats.js --knexfile ./db/knexfile.js

npx knex migrate:up 20221124193316_create_reservations.js --knexfile ./db/knexfile.js
npx knex migrate:down 20221124193316_create_reservations.js --knexfile ./db/knexfile.js

npx knex migrate:up 20221205204836_create_bookmarks.js --knexfile ./db/knexfile.js
npx knex migrate:down 20221205204836_create_bookmarks.js --knexfile ./db/knexfile.js

npx knex migrate:up 20221207081702_create_ratings.js --knexfile ./db/knexfile.js
npx knex migrate:down 20221207081702_create_ratings.js --knexfile ./db/knexfile.js
