import mariadb from "mariadb";

const pool = mariadb.createPool({
	host: process.env.MYSQL_HOSTNAME,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	connectionLimit: process.env.MYSQL_CONNECTIONS
});

export async function query(query, args) {
	let conn;
	try {
		conn = await pool.getConnection();
		const res = await conn.query(query, args);
		return res;
	} finally {
		if (conn) conn.release();
	}
}

export function disconnect() {
	pool.end();
}
