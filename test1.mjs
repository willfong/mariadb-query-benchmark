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

await DB.query("CREATE DATABASE IF NOT EXISTS test");
await DB.query(
	"CREATE OR REPLACE TABLE test.testing ( id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, col1 INT UNSIGNED, col2 INT UNSIGNED, col3 VARCHAR(255), col4 VARCHAR(255), UNIQUE KEY (col1, col2))"
);

let time;

console.log("Starting inserts using 1 connection...");
time = await UTILS.reportTime(async () => await batchInsert(200000));
console.log(`200000 inserts: ${time / 1000} seconds`);

console.log("Cleaning up table...");
await DB.query("TRUNCATE TABLE test.testing");

console.log("Starting inserts using 5 connections...");
time = await UTILS.reportTime(
	async () =>
		await Promise.all([
			batchInsert(40000),
			batchInsert(40000),
			batchInsert(40000),
			batchInsert(40000),
			batchInsert(40000),
		])
);
console.log(`200000 inserts: ${time / 1000} seconds`);

console.log("Cleaning up table...");
await DB.query("TRUNCATE TABLE test.testing");

console.log("Starting inserts using 10 connections...");
time = await UTILS.reportTime(
	async () =>
		await Promise.all([
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
			batchInsert(20000),
		])
);
console.log(`200000 inserts: ${time / 1000} seconds`);

console.log("Cleaning up table...");
await DB.query("TRUNCATE TABLE test.testing");

console.log("Starting inserts using 20 connections...");
time = await UTILS.reportTime(
	async () =>
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
		])
);
console.log(`200000 inserts: ${time / 1000} seconds`);

console.log("Cleaning up table...");
await DB.query("TRUNCATE TABLE test.testing");

console.log("Starting inserts using 40 connections...");
time = await UTILS.reportTime(
	async () =>
		await Promise.all([
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
			batchInsert(5000),
		])
);
console.log(`200000 inserts: ${time / 1000} seconds`);

DB.disconnect();
