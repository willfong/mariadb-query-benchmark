# MariaDB Query Benchmark Toolkit

**Proving theories via practice.**

This project is to provide reproducible and customizable test cases to fully understand how our databases work, so we don't need to blindly believe in _"best practices"_. Best practices don't always apply. So test it, and see what works best for _your_ specific use case.

## Test 1: Is it really faster to use multiple connections to insert data?

We know that it's faster to load data using concurrent queries. How much faster is it? At what point will it be constrained by other bottlenecks, like CPU, RAM, Disk IO on either the database server or the loading client? Let's find out.

```
Starting inserts using 1 connection...
200000 inserts: 127.12 seconds
Cleaning up table...
Starting inserts using 5 connections...
200000 inserts: 36.248 seconds
Cleaning up table...
Starting inserts using 10 connections...
200000 inserts: 23.647 seconds
Cleaning up table...
Starting inserts using 20 connections...
200000 inserts: 16.201 seconds
Cleaning up table...
Starting inserts using 40 connections...
200000 inserts: 11.494 seconds
```

## Test 2: Do we need an autoincrement in InnoDB?

There was a saying that all tables in InnoDB should have an auto-incrementing integer as a primary key. This is for "performance" reasons. But where exactly would I realize this performance gain? INSERTs? SELECTs?

![Test 2 performance graph](/assets/test2-graph.png "Time to insert a batch of 10k rows")

## Setup

### Environment

You'll want a `.env` file that looks like this:

```
MYSQL_HOSTNAME=127.0.0.1
MYSQL_USERNAME=root
MYSQL_PASSWORD=my-secret-pw
MYSQL_CONNECTIONS=20
LOGGER_TIMESTAMP=1
LOGGER_SEPARATOR=;
```

### Docker

```
docker run --detach --name mariadb --env MARIADB_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -v /PATH/TO/DATA:/var/lib/mysql mariadb:latest
```
