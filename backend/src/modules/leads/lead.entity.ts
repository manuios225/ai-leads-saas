import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  jobTitle: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 'NEW' })
  status: string;   // NEW / CONTACTED / REPLIED / QUALIFIED / INVALID

  @ManyToOne(() => Tenant, { nullable: false })
  tenant: Tenant;
}
