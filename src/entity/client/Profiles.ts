import { Column, Entity, Index } from 'typeorm';

@Index(
  'profilesUniqueEmailAuthorityProduct',
  ['email', 'authority', 'product'],
  { unique: true }
)
@Index('cif', ['cif'], { unique: true })
@Index('profilesEmailIdx', ['email'], {})
@Index('profilesClientIdIdx', ['clientId'], {})
@Entity('profiles')
export class Profiles {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { nullable: true, length: 36 })
  public clientId: string | null;

  @Column('varchar', { length: 255 })
  public email: string;

  @Column('varchar', { length: 32 })
  public authority: string;

  @Column('varchar', { length: 10, default: () => "'AUTH'" })
  public authType: string;

  @Column('char', { length: 2 })
  public country: string;

  @Column('varchar', { nullable: true, length: 255 })
  public passwordHash: string | null;

  @Column('varchar', { length: 255 })
  public role: string;

  @Column('varchar', { length: 255 })
  public status: string;

  @Column('varchar', { nullable: true, unique: false, length: 32 })
  public cif: string | null;

  @Column('varchar', { length: 64, default: () => "'cfd'" })
  public product: string;

  @Column('timestamp', {
    name: 'created',
    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('timestamp', {
    name: 'updated',
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  // @OneToMany(
  //   () => AccountPeriodicUpdateFields,
  //   accountPeriodicUpdateFields => accountPeriodicUpdateFields.account
  // )
  // public accountPeriodicUpdateFields: AccountPeriodicUpdateFields[];
  //
  // @OneToMany(
  //   () => AccountPeriodicUpdates,
  //   accountPeriodicUpdates => accountPeriodicUpdates.account
  // )
  // public accountPeriodicUpdates: AccountPeriodicUpdates[];
  //
  // @OneToMany(() => AccountStates, accountStates => accountStates.account)
  // public accountStates: AccountStates[];
  //
  // @OneToMany(() => Accounts, accounts => accounts.profile)
  // public accounts: Accounts[];
  //
  // @OneToMany(() => CfdBank, cfdBank => cfdBank.account)
  // public cfdBanks: CfdBank[];
  //
  // @OneToMany(
  //   () => GroupTransactions,
  //   groupTransactions => groupTransactions.profile
  // )
  // public groupTransactions: GroupTransactions[];
  //
  // @OneToMany(() => Identities, identities => identities.account)
  // public identities: Identities[];
  //
  // @OneToMany(() => InvestAccounts, investAccounts => investAccounts.account)
  // public investAccounts: InvestAccounts[];
  //
  // @OneToOne(() => LegalChecks, legalChecks => legalChecks.account)
  // public legalChecks: LegalChecks;
  //
  // @OneToMany(() => MfaTokens, mfaTokens => mfaTokens.profile)
  // public mfaTokens: MfaTokens[];
  //
  // @OneToMany(() => Otps, otps => otps.account)
  // public otps: Otps[];
  //
  // @OneToMany(
  //   () => PaymentAccounts,
  //   paymentAccounts => paymentAccounts.profile
  // )
  // public paymentAccounts: PaymentAccounts[];
  //
  // @OneToOne(
  //   () => ProfessionalCategorizations,
  //   professionalCategorizations => professionalCategorizations.profile
  // )
  // public professionalCategorizations: ProfessionalCategorizations;
  //
  // @OneToMany(() => ProfileFields, profileFields => profileFields.profile)
  // public profileFields: ProfileFields[];
  //
  // @OneToMany(
  //   () => PushNotifications,
  //   pushNotifications => pushNotifications.profile
  // )
  // public pushNotifications: PushNotifications[];
  //
  // @OneToOne(
  //   () => ScbProfessionalCategorizations,
  //   scbProfessionalCategorizations => scbProfessionalCategorizations.account
  // )
  // public scbProfessionalCategorizations: ScbProfessionalCategorizations;
  //
  // @OneToMany(() => SmsJobs, smsJobs => smsJobs.account)
  // public smsJobs: SmsJobs[];
  //
  // @OneToMany(() => Transactions, transactions => transactions.profile)
  // public transactions: Transactions[];
  //
  // @OneToMany(() => Wallets, wallets => wallets.profile)
  // public wallets: Wallets[];
}
