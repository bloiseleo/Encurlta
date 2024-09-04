import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1725421563210 implements MigrationInterface {

    private usersTable = new Table({
        name: 'users',
        columns: [
            {
                name: 'id',
                isPrimary: true,
                isGenerated: true,
                type: 'integer'
            },
            {
                name: 'email',
                type: 'text',
                isNullable: false,
                isUnique: true
            },
            {
                name: 'password',
                type: 'text',
                isNullable: false
            }
        ]
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.usersTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.usersTable);
    }

}
