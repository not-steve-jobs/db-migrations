import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Profiles } from './Profiles';

@Entity('profileAppropriatenessAttempts')
export class ProfileAppropriatenessAttempts {
  @PrimaryColumn({ type: 'int', width: 10, nullable: false, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  @Index('fkProfileAppropriatenessAttemptsProfilesIdx')
  public profileId: string;

  @Column('decimal', {
    nullable: false,
    precision: 10,
    scale: 2,
  })
  public score: string | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created: Date;

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkProfileAppropriatenessAttemptsProfiles' }])
  public profile: Profiles;
}
