import { Column, Entity } from 'typeorm';

@Entity('configurationsService_providerPaymentMethods')
export class ConfigurationsServiceProviderPaymentMethods {
  @Column('varchar', { primary: true, length: 64 })
  public id: string;

  @Column('varchar', { length: 255 })
  public paymentMethodName: string;

  @Column('varchar', { length: 255 })
  public paymentMethodCode: string;

  @Column('varchar', { length: 255 })
  public providerName: string;

  @Column('varchar', { length: 255 })
  public authority: string;

  @Column('text', { name: 'currencies' })
  public currencies: string;

  @Column('text', { name: 'countries' })
  public countries: string;

  @Column('tinyint', { default: 1, width: 1 })
  public isWebEnabled: boolean;

  @Column('tinyint', { default: 1, width: 1 })
  public isIosEnabled: boolean;

  @Column('varchar', { default: '0', length: 32 })
  public minIosVersion: string;

  @Column('tinyint', { default: 1, width: 1 })
  public isAndroidEnabled: boolean;

  @Column('varchar', { default: '0', length: 32 })
  public minAndroidVersion: string;

  @Column('datetime', { default: () => "'current_timestamp(6)'" })
  public createdAt: Date;

  @Column('datetime', { precision: 6 , nullable: true, default: () => "'current_timestamp(6)'", onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date | null;
}
