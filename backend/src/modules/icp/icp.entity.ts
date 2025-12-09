import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Entity()
export class ICP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, { nullable: false })
  tenant: Tenant;

  @Column("text", { array: true, nullable: true })
  industries: string[];

  @Column("text", { array: true, nullable: true })
  companySizes: string[];

  @Column("text", { array: true, nullable: true })
  jobTitles: string[];

  @Column("text", { array: true, nullable: true })
  regions: string[];

  @Column({ type: 'text', nullable: true })
  description: string;
}
