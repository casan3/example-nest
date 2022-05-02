import {MigrationInterface, QueryRunner} from "typeorm";

export class productPriceIndex1651522849185 implements MigrationInterface {
    name = 'productPriceIndex1651522849185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_b3234b06e4d16f52b384dfa4dd\` ON \`product\` (\`price\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b3234b06e4d16f52b384dfa4dd\` ON \`product\``);
    }

}
