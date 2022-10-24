import * as DB from "./mariadb.mjs";
import * as UTILS from "./utils.mjs";

async function batchInsert(rows) {
	const generateData = () => {
		return [
			UTILS.randomInt(1, 2 ** 31),
			UTILS.randomInt(1, 2 ** 31),
			UTILS.randomString(UTILS.randomInt(5, 15)),
			UTILS.randomString(UTILS.randomInt(10, 30)),
		];
	};
	for (let i = 0; i < rows; i++) {
		await DB.query("INSERT INTO test.testing ( col1, col2, col3, col4 ) VALUES (?,?,?,?)", generateData());
	}
}

async function start() {
	for (let i = 1; i <= 100; i++) {
		const startTs = Date.now();
		await Promise.all([
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
			batchInsert(10000),
		]);
		const endTs = Date.now();
		UTILS.batchLogger(String(i * 100000).padStart(7, "0"), (endTs - startTs) / 1000);
	}
}

await DB.query("CREATE DATABASE IF NOT EXISTS test");

console.log("Testing table with auto_increment primary key");
await DB.query(
	"CREATE OR REPLACE TABLE test.testing ( id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, col1 INT UNSIGNED, col2 INT UNSIGNED, col3 VARCHAR(255), col4 VARCHAR(255), UNIQUE KEY (col1, col2))"
);

await start();

console.log("Testing table with user-defined primary key");
await DB.query(
	"CREATE OR REPLACE TABLE test.testing ( col1 INT UNSIGNED, col2 INT UNSIGNED, col3 VARCHAR(255), col4 VARCHAR(255), PRIMARY KEY (col1, col2))"
);

await start();

DB.disconnect();
