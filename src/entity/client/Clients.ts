import { Column, Entity, Index } from 'typeorm';

@Index('email', ['email'], { unique: true })
@Index('cif', ['cif'], { unique: true })
@Index('clientsEmailIdx', ['email'], {})
@Index('clientsCifIdx', ['cif'], {})
@Entity('clients')
export class Clients {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { unique: false, length: 255 })
  public email: string;

  @Column('varchar', { nullable: true, length: 255 })
  public passwordHash: string | null;

  @Column('varchar', { nullable: true, unique: false, length: 32 })
  public cif: string | null;

  @Column('varchar', { length: 255 })
  public type: string;

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

  // @OneToMany(
  //   () => AuthenticationTokens,
  //   authenticationTokens => authenticationTokens.client
  // )
  // public authenticationTokens: AuthenticationTokens[];
  //
  // @OneToMany(() => ClientFields, clientFields => clientFields.client)
  // public clientFields: ClientFields[];
  //
  // @OneToMany(() => Identities, identities => identities.client)
  // public identities: Identities[];
  //
  // @OneToMany(() => Tins, tins => tins.client)
  // public tins: Tins[];
  //
  // @OneToMany(
  //   () => VerificationCodes,
  //   verificationCodes => verificationCodes.client
  // )
  // public verificationCodes: VerificationCodes[];
}
