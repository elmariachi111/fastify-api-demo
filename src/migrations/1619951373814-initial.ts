import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1619951373814 implements MigrationInterface {
    name = 'initial1619951373814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("hash" varchar PRIMARY KEY NOT NULL, "dateTime" datetime NOT NULL, "from" varchar NOT NULL, "to" varchar NOT NULL, "amount" varchar NOT NULL, "tokenAddress" varchar)`);
        await queryRunner.query(`CREATE TABLE "token" ("address" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "symbol" varchar NOT NULL, "type" varchar NOT NULL, "decimals" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("hash" varchar PRIMARY KEY NOT NULL, "dateTime" datetime NOT NULL, "from" varchar NOT NULL, "to" varchar NOT NULL, "amount" varchar NOT NULL, "tokenAddress" varchar, CONSTRAINT "FK_42b690d78fbb322d1b34fe7a46a" FOREIGN KEY ("tokenAddress") REFERENCES "token" ("address") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("hash", "dateTime", "from", "to", "amount", "tokenAddress") SELECT "hash", "dateTime", "from", "to", "amount", "tokenAddress" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("hash" varchar PRIMARY KEY NOT NULL, "dateTime" datetime NOT NULL, "from" varchar NOT NULL, "to" varchar NOT NULL, "amount" varchar NOT NULL, "tokenAddress" varchar)`);
        await queryRunner.query(`INSERT INTO "transaction"("hash", "dateTime", "from", "to", "amount", "tokenAddress") SELECT "hash", "dateTime", "from", "to", "amount", "tokenAddress" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
