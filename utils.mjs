import crypto from "crypto";
import { fdatasyncSync } from "fs";

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function randomString(length) {
	return crypto.randomBytes(length).toString("hex").substring(0, length);
}

export function batchLogger(batchId, seconds) {
	const data = [batchId, seconds];
	if (process.env.LOGGER_TIMESTAMP == 1) {
		data.unshift(new Date().toISOString());
	}
	const sep = process.env.LOGGER_SEPARATOR ?? "\t";
	console.log(data.join(sep));
}

export async function reportTime(callback) {
	const startTs = Date.now();
	await callback();
	const endTs = Date.now();
	return endTs - startTs;
}
