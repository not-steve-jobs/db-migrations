import { Column, Entity, Index } from 'typeorm';

@Index('documentsOwnerTypeOwnerId', ['ownerType', 'ownerId'], {})
@Entity('documents')
export class Documents {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { length: 36 })
  @Index('objectId', { unique: true })
  public objectId: string;

  @Column('varchar', { length: 255 })
  public name: string;

  @Column('varchar', { length: 128 })
  public ownerType: string;

  @Column('char', { nullable: true, length: 36 })
  @Index('documentsOwnerIdIdx')
  public ownerId: string | null;

  @Column('varchar', { nullable: true, length: 32 })
  public docType: string | null;

  @Column('varchar', { nullable: true, length: 128 })
  public mimeType: string | null;

  @Column('date', { nullable: true })
  public expirationDate: string | null;

  @Column('varchar', { length: 32, default: () => "'front'" })
  public side: string;

  @Column('varchar', { length: 32, default: () => "'pending'" })
  public status: string;

  @Column('mediumtext', { nullable: true })
  public translation: string | null;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
