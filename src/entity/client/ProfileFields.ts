import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { StringToJsonTransformer } from '../utils/string-to-json-transformer';

import { Profiles } from './Profiles';

@Index('profileFieldsUniqueProfileIdKey', ['profileId', 'key'], {
  unique: true,
})
@Index('fkProfileFieldsProfilesIdx', ['profileId'], {})
@Entity('profileFields')
export class ProfileFields {
  @PrimaryColumn({ type: 'int', name: 'id', width: 10, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('mediumtext', { nullable: true, transformer: new StringToJsonTransformer() })
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

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkProfileFieldsProfiles' }])
  public profile: Profiles;
}
