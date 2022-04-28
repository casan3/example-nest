import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsCreatedUpdatedProducts1651171484461 implements MigrationInterface {
    name = 'addFieldsCreatedUpdatedProducts1651171484461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createdAt\``);
    }

}
