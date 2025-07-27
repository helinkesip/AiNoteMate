import { DataSource } from 'typeorm';
import { Organization } from './organization.entity';
import { config } from 'dotenv';
config();

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Organization],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const orgRepo = dataSource.getRepository(Organization);
  const existing = await orgRepo.findOne({ where: { name: 'TrakyaUniversity' } });
  if (!existing) {
    await orgRepo.save(orgRepo.create({ name: 'TrakyaUniversity' }));
    console.log('Seeded TrakyaUniversity');
  } else {
    console.log('TrakyaUniversity already exists');
  }
  await dataSource.destroy();
}

seed(); 