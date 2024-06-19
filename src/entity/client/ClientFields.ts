import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { StringToJsonTransformer } from '../utils/string-to-json-transformer';

import { Clients } from './Clients';

@Index('clientFieldsUniqueClientIdKey', ['clientId', 'key'], { unique: true })
@Index('fkClientFieldsClientsIdx', ['clientId'], {})
@Entity('clientFields')
export class ClientFields {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public clientId: string;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('text', { nullable: true, transformer: new StringToJsonTransformer() })
  public value: string | object | null;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @ManyToOne(() => Clients, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkClientFieldsClients' }])
  public client: Clients;
}
