import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    nullable: false,
  })
  password: string;
  static builderNew(email: string, password: string): User {
    const user = new User();
    user.email = email;
    user.password = password;
    return user;
  }
  static builder(id: number, email: string, password: string): User {
    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    return user;
  }
  @BeforeInsert()
  private async hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
