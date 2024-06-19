import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('pushNotificationsUniqueTag', ['tag'], { unique: true })
@Index('pushNotificationsTagIdx', ['tag'], {})
@Index('fkPushNotificationsProfilesIdx', ['profileId'], {})
@Index('pushNotificationsDeviceIdIdx', ['deviceId'], {})
@Entity('pushNotifications')
export class PushNotifications {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { nullable: true, length: 36 })
  public profileId: string | null;

  @Column('char', { length: 10 })
  public platform: string;

  @Column('char', { length: 10 })
  public os: string;

  @Column('char', { nullable: true, length: 255 })
  public deviceId: string | null;

  @Column('char', { length: 2 })
  public deviceLanguage: string;

  @Column('char', { length: 6 })
  public deviceTimeZone: string;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public enabled: boolean;

  @Column('varchar', { unique: false, length: 255 })
  public tag: string;

  @Column('varchar', { length: 5, default: () => "'eu'" })
  public region: string;

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

  @Column('varchar', {

    nullable: true,
    length: 50,
    default: () => "''",
  })
  public osVersion: string | null;

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkPushNotificationsProfiles' }])
  public profile: Profiles;
}
