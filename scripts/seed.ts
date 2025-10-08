import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { products } from '../src/lib/db/schema';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const nikeProducts = [
  {
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
    price: '150.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-mens-shoes-KkLcGR.png',
    category: 'Shoes',
    brand: 'Nike',
  },
  {
    name: 'Nike Air Force 1',
    description: 'The radiance lives on in the Nike Air Force 1, the basketball original.',
    price: '110.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png',
    category: 'Shoes',
    brand: 'Nike',
  },
  {
    name: 'Nike Dri-FIT T-Shirt',
    description: 'Nike Dri-FIT technology moves sweat away from your skin.',
    price: '25.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/dri-fit-mens-fitness-t-shirt-HPFWLh.png',
    category: 'Apparel',
    brand: 'Nike',
  },
  {
    name: 'Nike React Infinity Run',
    description: 'Designed to help reduce injury and keep you on the run.',
    price: '160.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-3-mens-road-running-shoes-XhzpPH.png',
    category: 'Shoes',
    brand: 'Nike',
  },
  {
    name: 'Nike Swoosh Sports Bra',
    description: 'The Nike Swoosh Sports Bra gives you comfortable support.',
    price: '30.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7c5678f4-c28d-4862-a8d9-56750f839f19/swoosh-medium-support-sports-bra-2vHvAk.png',
    category: 'Apparel',
    brand: 'Nike',
  },
  {
    name: 'Nike Tech Fleece Hoodie',
    description: 'The Nike Tech Fleece Hoodie delivers premium warmth.',
    price: '90.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/tech-fleece-mens-full-zip-hoodie-Bd8QLz.png',
    category: 'Apparel',
    brand: 'Nike',
  },
];

async function seed() {
  try {
    console.log('Seeding database...');
    
    await db.insert(products).values(nikeProducts);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();