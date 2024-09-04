import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

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
  static builder(id: number, email: string, password: string) {
    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    return user;
  }
  @BeforeInsert()
  private async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
