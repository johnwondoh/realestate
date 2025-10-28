import { db } from '@/lib/db'; // your drizzle db instance
import { agencies, users, agents, properties, favorites } from './schema';
// import * as bcrypt from 'bcrypt';

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seed() {
    console.log('🌱 Seeding database...');

    // Clear existing data (optional - comment out if you want to preserve data)
    await db.delete(favorites);
    // await db.delete(inquiries);
    await db.delete(properties);
    await db.delete(agents);
    await db.delete(users);
    await db.delete(agencies);

    // 1. Create Agencies
    const [agency1, agency2, agency3] = await db.insert(agencies).values([
        {
            name: 'Prestige Realty Group',
            slug: 'prestige-realty',
            email: 'info@prestigerealty.com',
            phone: '(555) 123-4567',
            address: '123 Main Street',
            city: 'Austin',
            state: 'TX',
            zip: '78701',
            logoUrl: 'https://placehold.co/200x80/2563eb/white?text=Prestige',
            brandColor: '#2563eb',
            website: 'https://prestigerealty.com',
            description: 'Luxury real estate specialists serving Austin for over 20 years',
            licenseNumber: 'TX-RE-12345',
            isActive: true,
        },
        {
            name: 'Metro Commercial Properties',
            slug: 'metro-commercial',
            email: 'contact@metrocommercial.com',
            phone: '(555) 987-6543',
            address: '456 Business Blvd',
            city: 'Dallas',
            state: 'TX',
            zip: '75201',
            logoUrl: 'https://placehold.co/200x80/059669/white?text=Metro',
            brandColor: '#059669',
            website: 'https://metrocommercial.com',
            description: 'Premier commercial real estate brokerage in North Texas',
            licenseNumber: 'TX-RE-67890',
            isActive: true,
        },
        {
            name: 'Coastal Living Realty',
            slug: 'coastal-living',
            email: 'hello@coastalliving.com',
            phone: '(555) 456-7890',
            address: '789 Beach Road',
            city: 'Galveston',
            state: 'TX',
            zip: '77550',
            logoUrl: 'https://placehold.co/200x80/0891b2/white?text=Coastal',
            brandColor: '#0891b2',
            website: 'https://coastalliving.com',
            description: 'Your trusted partner for beachfront and coastal properties',
            licenseNumber: 'TX-RE-11223',
            isActive: true,
        },
    ]).returning();

    // 2. Create Users & Agents
    // const passwordHash = await bcrypt.hash('password123', 10);
    const passwordHash = "jhgfd";

    const [user1, user2, user3, user4, user5] = await db.insert(users).values([
        { email: 'sarah.johnson@prestigerealty.com', passwordHash, role: 'agent' },
        { email: 'michael.chen@prestigerealty.com', passwordHash, role: 'agent' },
        { email: 'david.martinez@metrocommercial.com', passwordHash, role: 'agent' },
        { email: 'emily.davis@coastalliving.com', passwordHash, role: 'agent' },
        { email: 'admin@prestigerealty.com', passwordHash, role: 'agency_admin' },
    ]).returning();

    const [agent1, agent2, agent3, agent4] = await db.insert(agents).values([
        {
            userId: user1.id,
            agencyId: agency1.id,
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@prestigerealty.com',
            phone: '(555) 111-2222',
            photoUrl: 'https://i.pravatar.cc/300?img=1',
            bio: 'Luxury home specialist with 15 years of experience in the Austin market. Passionate about helping families find their dream homes.',
            licenseNumber: 'TX-AGT-11111',
            specialtyAreas: ['residential', 'luxury', 'new_construction'],
            yearsExperience: 15,
            isActive: true,
        },
        {
            userId: user2.id,
            agencyId: agency1.id,
            firstName: 'Michael',
            lastName: 'Chen',
            email: 'michael.chen@prestigerealty.com',
            phone: '(555) 222-3333',
            photoUrl: 'https://i.pravatar.cc/300?img=12',
            bio: 'First-time homebuyer expert and investment property consultant. Dedicated to making the home buying process smooth and stress-free.',
            licenseNumber: 'TX-AGT-22222',
            specialtyAreas: ['residential', 'investment', 'condos'],
            yearsExperience: 8,
            isActive: true,
        },
        {
            userId: user3.id,
            agencyId: agency2.id,
            firstName: 'David',
            lastName: 'Martinez',
            email: 'david.martinez@metrocommercial.com',
            phone: '(555) 333-4444',
            photoUrl: 'https://i.pravatar.cc/300?img=33',
            bio: 'Commercial real estate veteran specializing in office and retail spaces. 20+ years helping businesses find the perfect location.',
            licenseNumber: 'TX-AGT-33333',
            specialtyAreas: ['commercial', 'office', 'retail'],
            yearsExperience: 22,
            isActive: true,
        },
        {
            userId: user4.id,
            agencyId: agency3.id,
            firstName: 'Emily',
            lastName: 'Davis',
            email: 'emily.davis@coastalliving.com',
            phone: '(555) 444-5555',
            photoUrl: 'https://i.pravatar.cc/300?img=5',
            bio: 'Coastal property expert with deep knowledge of Galveston real estate. Your guide to beachfront living and vacation properties.',
            licenseNumber: 'TX-AGT-44444',
            specialtyAreas: ['residential', 'vacation_homes', 'waterfront'],
            yearsExperience: 12,
            isActive: true,
        },
    ]).returning();

    // 3. Create Properties (Residential)
    const prop1Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2401 West Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78705',
        latitude: '30.2905',
        longitude: '-97.7551',
        minPrice: '1250000.00',
        maxPrice: '1250000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.5',
        sqft: 3200,
        lotSize: '0.25',
        yearBuilt: 2018,
        propertyType: 'house' as const,
        description: 'Stunning modern home in the heart of West Austin. Features open floor plan, chef\'s kitchen with high-end appliances, master suite with spa-like bathroom, and a beautifully landscaped backyard with pool.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/1',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 145,
    };

    const [prop1] = await db.insert(properties).values(prop1Data).returning();

    const prop2Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1500 Lake Shore Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78746',
        latitude: '30.2672',
        longitude: '-97.7431',
        minPrice: '2750000.00',
        maxPrice: '2950000.00',
        isAuction: true,
        bedrooms: 5,
        bathrooms: '4.5',
        sqft: 5400,
        lotSize: '0.75',
        yearBuilt: 2020,
        propertyType: 'house' as const,
        description: 'Luxury lakefront estate with breathtaking views. Custom-built with premium finishes throughout. Features include home theater, wine cellar, infinity pool, and private dock. Now available via auction!',
        features: ['waterfront', 'pool', 'home_theater', 'wine_cellar', 'smart_home', 'dock', 'three_car_garage'],
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        ],
        isResidential: true,
        status: 'buy' as const,
        viewCount: 289,
    };

    const [prop2] = await db.insert(properties).values(prop2Data).returning();

    const prop3Data = {
        agentId: agent2.id,
        agencyId: agency1.id,
        address: '800 Congress Avenue #1502',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2672',
        longitude: '-97.7431',
        minPrice: '575000.00',
        maxPrice: '575000.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2',
        sqft: 1450,
        yearBuilt: 2019,
        propertyType: 'condo' as const,
        description: 'Modern downtown condo with stunning city views. High-end finishes, floor-to-ceiling windows, and access to luxury amenities including rooftop pool, fitness center, and concierge service.',
        features: ['downtown', 'city_views', 'gym', 'rooftop_pool', 'concierge', 'parking_included'],
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        ],
        isResidential: true,
        status: 'buy' as const,
        viewCount: 203,
    };

    const [prop3] = await db.insert(properties).values(prop3Data).returning();

    const prop4Data = {
        agentId: agent4.id,
        agencyId: agency3.id,
        address: '5678 Beachfront Boulevard',
        city: 'Galveston',
        state: 'TX',
        zip: '77551',
        latitude: '29.3013',
        longitude: '-94.7977',
        minPrice: '895000.00',
        maxPrice: '895000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '3',
        sqft: 2200,
        lotSize: '0.15',
        yearBuilt: 2021,
        propertyType: 'house' as const,
        description: 'Brand new beachfront home with unobstructed gulf views. Open concept living, expansive deck, and direct beach access. Perfect vacation home or investment property.',
        features: ['beachfront', 'deck', 'outdoor_shower', 'impact_windows', 'elevator'],
        images: [
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
        ],
        isResidential: true,
        status: 'buy' as const,
        viewCount: 178,
    };

    const [prop4] = await db.insert(properties).values(prop4Data).returning();

    const prop5Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1523 Oak Ridge Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2672',
        longitude: '-97.7431',
        minPrice: '850000.00',
        maxPrice: '850000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.5',
        sqft: 2400,
        lotSize: '0.18',
        yearBuilt: 2020,
        propertyType: 'house' as const,
        description: 'Contemporary home with panoramic hill country views. Open concept living, gourmet kitchen, spacious bedrooms, and covered patio perfect for entertaining.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system', 'hardwood_floors'],
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/5',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 89,
    };

    const [prop5] = await db.insert(properties).values(prop5Data).returning();

    const prop6Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '3305 Westlake Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78746',
        latitude: '30.2795',
        longitude: '-97.8013',
        minPrice: '2100000.00',
        maxPrice: '2100000.00',
        isAuction: false,
        bedrooms: 5,
        bathrooms: '4.5',
        sqft: 4500,
        lotSize: '0.42',
        yearBuilt: 2021,
        propertyType: 'house' as const,
        description: 'Luxurious lakefront estate with private dock. Designer finishes throughout, wine cellar, theater room, infinity pool, and breathtaking lake views from every room.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
            'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/6',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 234,
    };

    const [prop6] = await db.insert(properties).values(prop6Data).returning();

    const prop7Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '908 Congress Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2711',
        longitude: '-97.7437',
        minPrice: '650000.00',
        maxPrice: '650000.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.0',
        sqft: 1600,
        lotSize: '0.00',
        yearBuilt: 2019,
        propertyType: 'condo' as const,
        description: 'Sophisticated downtown condo with floor-to-ceiling windows. Modern finishes, open layout, rooftop pool and fitness center. Walk to restaurants and entertainment.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/7',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 167,
    };

    const [prop7] = await db.insert(properties).values(prop7Data).returning();

    const prop8Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '4721 Shoal Creek Boulevard',
        city: 'Austin',
        state: 'TX',
        zip: '78756',
        latitude: '30.3158',
        longitude: '-97.7414',
        minPrice: '975000.00',
        maxPrice: '975000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.0',
        sqft: 2800,
        lotSize: '0.22',
        yearBuilt: 2017,
        propertyType: 'house' as const,
        description: 'Charming craftsman home in desirable Allandale neighborhood. Updated kitchen, hardwood floors throughout, covered front porch, and large backyard with mature trees.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/8',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 103,
    };

    const [prop8] = await db.insert(properties).values(prop8Data).returning();

    const prop9Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2215 South Lamar Boulevard',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        latitude: '30.2456',
        longitude: '-97.7645',
        minPrice: '3500.00',
        maxPrice: '3500.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.0',
        sqft: 1400,
        lotSize: '0.00',
        yearBuilt: 2022,
        propertyType: 'condo' as const,
        description: 'Brand new South Lamar condo in prime location. Modern amenities, quartz countertops, stainless appliances, in-unit washer/dryer, and assigned parking.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800',
            'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/9',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 198,
    };

    const [prop9] = await db.insert(properties).values(prop9Data).returning();

    const prop10Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1807 West Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2778',
        longitude: '-97.7542',
        minPrice: '1450000.00',
        maxPrice: '1450000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.5',
        sqft: 3400,
        lotSize: '0.28',
        yearBuilt: 2019,
        propertyType: 'house' as const,
        description: 'Elegant two-story home in Clarksville. High ceilings, chef\'s kitchen with butler\'s pantry, luxurious master retreat, covered outdoor living area with summer kitchen.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
            'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
            'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/10',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 176,
    };

    const [prop10] = await db.insert(properties).values(prop10Data).returning();

    const prop11Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '5604 Balcones Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78731',
        latitude: '30.3456',
        longitude: '-97.7589',
        minPrice: '725000.00',
        maxPrice: '725000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.5',
        sqft: 2200,
        lotSize: '0.20',
        yearBuilt: 2016,
        propertyType: 'house' as const,
        description: 'Inviting ranch-style home in Balcones neighborhood. Open floor plan, updated kitchen and bathrooms, large deck overlooking greenbelt, attached two-car garage.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800',
            'https://images.unsplash.com/photo-1599809275854-e6114a1f2e3e?w=800',
            'https://images.unsplash.com/photo-1599809275946-ab7d20c6d4c0?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/11',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 92,
    };

    const [prop11] = await db.insert(properties).values(prop11Data).returning();

    const prop12Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '3112 Windsor Road',
        city: 'Austin',
        state: 'TX',
        zip: '78703',
        latitude: '30.2922',
        longitude: '-97.7612',
        minPrice: '1850000.00',
        maxPrice: '1850000.00',
        isAuction: false,
        bedrooms: 5,
        bathrooms: '4.0',
        sqft: 4200,
        lotSize: '0.35',
        yearBuilt: 2020,
        propertyType: 'house' as const,
        description: 'Architectural masterpiece in Tarrytown. Custom design with smart home technology, wine room, home office, resort-style pool with spa, and three-car garage.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/12',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 267,
    };

    const [prop12] = await db.insert(properties).values(prop12Data).returning();

    const prop13Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1516 Barton Springs Road',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        latitude: '30.2634',
        longitude: '-97.7689',
        minPrice: '2800.00',
        maxPrice: '2800.00',
        isAuction: false,
        bedrooms: 1,
        bathrooms: '1.0',
        sqft: 850,
        lotSize: '0.00',
        yearBuilt: 2021,
        propertyType: 'condo' as const,
        description: 'Trendy Zilker studio with modern finishes. Open layout, full kitchen, private balcony, community pool and fitness center. Minutes from Barton Springs.',
        features: ['stainless_appliances', 'granite_counters'],
        images: [
            'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
            'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/13',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 145,
    };

    const [prop13] = await db.insert(properties).values(prop13Data).returning();

    const prop14Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '7823 Rockwood Lane',
        city: 'Austin',
        state: 'TX',
        zip: '78757',
        latitude: '30.3512',
        longitude: '-97.7234',
        minPrice: '550000.00',
        maxPrice: '550000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.0',
        sqft: 1800,
        lotSize: '0.15',
        yearBuilt: 2015,
        propertyType: 'house' as const,
        description: 'Cozy bungalow in North Loop neighborhood. Renovated kitchen, original hardwood floors, private backyard with deck, close to shops and restaurants.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances'],
        images: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
            'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/14',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 78,
    };

    const [prop14] = await db.insert(properties).values(prop14Data).returning();

    const prop15Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '4509 Duval Street',
        city: 'Austin',
        state: 'TX',
        zip: '78751',
        latitude: '30.3089',
        longitude: '-97.7267',
        minPrice: '895000.00',
        maxPrice: '895000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.0',
        sqft: 2600,
        lotSize: '0.19',
        yearBuilt: 2018,
        propertyType: 'house' as const,
        description: 'Modern farmhouse in Hyde Park. Shiplap accents, farmhouse sink, oversized island, master on main, fenced yard with patio and fire pit.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
            'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/15',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 134,
    };

    const [prop15] = await db.insert(properties).values(prop15Data).returning();

    const prop16Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2200 Barton Skyway',
        city: 'Austin',
        state: 'TX',
        zip: '78746',
        latitude: '30.2689',
        longitude: '-97.7856',
        minPrice: '4200.00',
        maxPrice: '4200.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.5',
        sqft: 2000,
        lotSize: '0.00',
        yearBuilt: 2023,
        propertyType: 'condo' as const,
        description: 'Luxury penthouse with panoramic city views. Floor-to-ceiling windows, high-end finishes, private terrace, concierge service, and resort-style amenities.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
            'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800',
            'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/16',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 289,
    };

    const [prop16] = await db.insert(properties).values(prop16Data).returning();

    const prop17Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '6712 Berkman Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78723',
        latitude: '30.2956',
        longitude: '-97.6912',
        minPrice: '485000.00',
        maxPrice: '485000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.0',
        sqft: 1650,
        lotSize: '0.16',
        yearBuilt: 2014,
        propertyType: 'house' as const,
        description: 'Affordable East Austin home with great bones. Updated flooring, fresh paint, covered carport, large backyard with storage shed, minutes from downtown.',
        features: ['granite_counters', 'stainless_appliances'],
        images: [
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
            'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=800',
            'https://images.unsplash.com/photo-1605276373977-593c842eec1e?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/17',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 56,
    };

    const [prop17] = await db.insert(properties).values(prop17Data).returning();

    const prop18Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1205 East 6th Street',
        city: 'Austin',
        state: 'TX',
        zip: '78702',
        latitude: '30.2645',
        longitude: '-97.7312',
        minPrice: '3200.00',
        maxPrice: '3200.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.0',
        sqft: 1350,
        lotSize: '0.00',
        yearBuilt: 2020,
        propertyType: 'condo' as const,
        description: 'Hip East 6th Street loft with industrial charm. Exposed brick, concrete floors, tall ceilings, modern kitchen, rooftop deck with skyline views.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800',
            'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800',
            'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/18',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 212,
    };

    const [prop18] = await db.insert(properties).values(prop18Data).returning();

    const prop19Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '9104 Wood Hollow Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78758',
        latitude: '30.3778',
        longitude: '-97.6934',
        minPrice: '625000.00',
        maxPrice: '625000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '2.5',
        sqft: 2300,
        lotSize: '0.21',
        yearBuilt: 2016,
        propertyType: 'house' as const,
        description: 'Family-friendly home in North Austin. Spacious living areas, updated kitchen with breakfast bar, game room, covered patio, and cul-de-sac location.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800',
            'https://images.unsplash.com/photo-1572120360349-b59f37568c30?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/19',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 87,
    };

    const [prop19] = await db.insert(properties).values(prop19Data).returning();

    const prop20Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '3801 Manchaca Road',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        latitude: '30.2378',
        longitude: '-97.7689',
        minPrice: '1150000.00',
        maxPrice: '1150000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.0',
        sqft: 2900,
        lotSize: '0.24',
        yearBuilt: 2019,
        propertyType: 'house' as const,
        description: 'Contemporary South Austin home near Manchaca. Open concept design, luxury vinyl plank flooring, quartz counters, spa shower, covered porch with ceiling fan.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
            'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
            'https://images.unsplash.com/photo-600585152034-c4338f380b97?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/20',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 121,
    };

    const [prop20] = await db.insert(properties).values(prop20Data).returning();

    const prop21Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2515 Nueces Street',
        city: 'Austin',
        state: 'TX',
        zip: '78705',
        latitude: '30.2889',
        longitude: '-97.7467',
        minPrice: '2200.00',
        maxPrice: '2200.00',
        isAuction: false,
        bedrooms: 1,
        bathrooms: '1.0',
        sqft: 750,
        lotSize: '0.00',
        yearBuilt: 2022,
        propertyType: 'condo' as const,
        description: 'New studio near UT campus. Efficient layout, modern appliances, in-unit laundry, bike storage, walking distance to campus and West Campus dining.',
        features: ['stainless_appliances', 'granite_counters'],
        images: [
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
            'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/21',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 178,
    };

    const [prop21] = await db.insert(properties).values(prop21Data).returning();

    const prop22Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '5217 Avenue F',
        city: 'Austin',
        state: 'TX',
        zip: '78751',
        latitude: '30.3123',
        longitude: '-97.7301',
        minPrice: '1050000.00',
        maxPrice: '1050000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.5',
        sqft: 2500,
        lotSize: '0.17',
        yearBuilt: 2021,
        propertyType: 'house' as const,
        description: 'Stunning new construction in Rosedale. Energy-efficient design, smart home features, designer lighting, quartz countertops, and oversized primary suite.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
            'https://images.unsplash.com/photo-1600607688960-e095ff98a44b?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/22',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 156,
    };

    const [prop22] = await db.insert(properties).values(prop22Data).returning();

    const prop23Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '11200 Lakeline Boulevard',
        city: 'Austin',
        state: 'TX',
        zip: '78717',
        latitude: '30.4456',
        longitude: '-97.7823',
        minPrice: '425000.00',
        maxPrice: '425000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.0',
        sqft: 1900,
        lotSize: '0.12',
        yearBuilt: 2013,
        propertyType: 'house' as const,
        description: 'Well-maintained Cedar Park home. Open floor plan, vaulted ceilings, granite counters, large master bedroom, community pool and playground.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800',
            'https://images.unsplash.com/photo-1600563440091-e77fd47c9cfd?w=800',
            'https://images.unsplash.com/photo-1600563439775-3f2f8358a0e8?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/23',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 63,
    };

    const [prop23] = await db.insert(properties).values(prop23Data).returning();

    const prop24Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1508 Collier Street',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        latitude: '30.2523',
        longitude: '-97.7567',
        minPrice: '775000.00',
        maxPrice: '775000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.0',
        sqft: 1950,
        lotSize: '0.14',
        yearBuilt: 2017,
        propertyType: 'house' as const,
        description: 'Charming Bouldin Creek cottage with modern updates. Hardwood floors, updated kitchen, flex space for home office, private backyard with shade trees.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances'],
        images: [
            'https://images.unsplash.com/photo-1600047508788-786f47336665?w=800',
            'https://images.unsplash.com/photo-1600047508872-e80f89b1dd8c?w=800',
            'https://images.unsplash.com/photo-1600047509005-63b4e0c6f2bf?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/24',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 109,
    };

    const [prop24] = await db.insert(properties).values(prop24Data).returning();

    const prop25Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '701 Brazos Street',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2701',
        longitude: '-97.7423',
        minPrice: '5500.00',
        maxPrice: '5500.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '3.0',
        sqft: 2200,
        lotSize: '0.00',
        yearBuilt: 2023,
        propertyType: 'condo' as const,
        description: 'Ultra-luxury downtown high-rise living. Floor-to-ceiling windows, European appliances, smart home integration, valet parking, 24/7 concierge.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/25',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 342,
    };

    const [prop25] = await db.insert(properties).values(prop25Data).returning();

    const prop26Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '8305 Capstone Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78759',
        latitude: '30.4012',
        longitude: '-97.7456',
        minPrice: '695000.00',
        maxPrice: '695000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '2.5',
        sqft: 2450,
        lotSize: '0.18',
        yearBuilt: 2015,
        propertyType: 'house' as const,
        description: 'Spacious Northwest Hills home with hill country views. Open concept, island kitchen, bonus room upstairs, covered patio, mature landscaping.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
            'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/26',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 94,
    };

    const [prop26] = await db.insert(properties).values(prop26Data).returning();

    const prop27Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2909 San Jacinto Boulevard',
        city: 'Austin',
        state: 'TX',
        zip: '78705',
        latitude: '30.2934',
        longitude: '-97.7334',
        minPrice: '1900.00',
        maxPrice: '1900.00',
        isAuction: false,
        bedrooms: 1,
        bathrooms: '1.0',
        sqft: 680,
        lotSize: '0.00',
        yearBuilt: 2021,
        propertyType: 'condo' as const,
        description: 'Cozy efficiency apartment near UT. Murphy bed, kitchenette, updated bathroom, on-site laundry, perfect for students or young professionals.',
        features: ['stainless_appliances'],
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
            'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/27',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 167,
    };

    const [prop27] = await db.insert(properties).values(prop27Data).returning();

    const prop28Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '4412 Avenue H',
        city: 'Austin',
        state: 'TX',
        zip: '78751',
        latitude: '30.3067',
        longitude: '-97.7289',
        minPrice: '1275000.00',
        maxPrice: '1275000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.5',
        sqft: 3100,
        lotSize: '0.23',
        yearBuilt: 2020,
        propertyType: 'house' as const,
        description: 'Designer Hyde Park home with luxury finishes. Custom cabinetry, Italian tile, spa-inspired bathrooms, covered outdoor kitchen, saltwater pool.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/28',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 203,
    };

    const [prop28] = await db.insert(properties).values(prop28Data).returning();

    const prop29Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '6701 Burnet Road',
        city: 'Austin',
        state: 'TX',
        zip: '78757',
        latitude: '30.3456',
        longitude: '-97.7289',
        minPrice: '2650.00',
        maxPrice: '2650.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.0',
        sqft: 1250,
        lotSize: '0.00',
        yearBuilt: 2022,
        propertyType: 'condo' as const,
        description: 'Modern Burnet Road apartment with convenient location. Open kitchen, large windows, walk-in closet, covered parking, near shopping and restaurants.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800',
            'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/29',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 156,
    };

    const [prop29] = await db.insert(properties).values(prop29Data).returning();

    const prop30Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1211 West 34th Street',
        city: 'Austin',
        state: 'TX',
        zip: '78705',
        latitude: '30.2989',
        longitude: '-97.7489',
        minPrice: '825000.00',
        maxPrice: '825000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.5',
        sqft: 2100,
        lotSize: '0.16',
        yearBuilt: 2018,
        propertyType: 'house' as const,
        description: 'Renovated North University home. Open living and dining, updated kitchen with subway tile, refinished hardwoods, large windows, detached garage.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/30',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 112,
    };

    const [prop30] = await db.insert(properties).values(prop30Data).returning();

    const prop31Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '3515 Greystone Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78731',
        latitude: '30.3534',
        longitude: '-97.7612',
        minPrice: '1650000.00',
        maxPrice: '1650000.00',
        isAuction: false,
        bedrooms: 5,
        bathrooms: '4.0',
        sqft: 3900,
        lotSize: '0.38',
        yearBuilt: 2019,
        propertyType: 'house' as const,
        description: 'Magnificent Balcones Country Club estate. Gourmet kitchen with double islands, game room with wet bar, media room, outdoor living with pool and spa.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
            'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/31',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 276,
    };

    const [prop31] = await db.insert(properties).values(prop31Data).returning();

    const prop32Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1420 South Congress Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        latitude: '30.2534',
        longitude: '-97.7489',
        minPrice: '3800.00',
        maxPrice: '3800.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.5',
        sqft: 1600,
        lotSize: '0.00',
        yearBuilt: 2023,
        propertyType: 'condo' as const,
        description: 'Brand new SoCo loft with incredible location. Industrial-chic design, mezzanine bedroom, private rooftop access, steps from iconic shops and eateries.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800',
            'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800',
            'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/32',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 298,
    };

    const [prop32] = await db.insert(properties).values(prop32Data).returning();

    const prop33Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '5803 Shoal Creek Boulevard',
        city: 'Austin',
        state: 'TX',
        zip: '78757',
        latitude: '30.3234',
        longitude: '-97.7401',
        minPrice: '565000.00',
        maxPrice: '565000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.0',
        sqft: 1750,
        lotSize: '0.14',
        yearBuilt: 2016,
        propertyType: 'house' as const,
        description: 'Delightful Crestview bungalow with character. Original details preserved, modern kitchen and baths, large front porch, fenced yard, walk to shops.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances'],
        images: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
            'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/33',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 76,
    };

    const [prop33] = await db.insert(properties).values(prop33Data).returning();

    const prop34Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2204 East Riverside Drive',
        city: 'Austin',
        state: 'TX',
        zip: '78741',
        latitude: '30.2423',
        longitude: '-97.7312',
        minPrice: '2400.00',
        maxPrice: '2400.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '1.0',
        sqft: 950,
        lotSize: '0.00',
        yearBuilt: 2021,
        propertyType: 'condo' as const,
        description: 'Affordable Riverside apartment with bus line access. Renovated unit, new flooring, updated appliances, community pool, close to downtown and trails.',
        features: ['stainless_appliances', 'granite_counters'],
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/34',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 134,
    };

    const [prop34] = await db.insert(properties).values(prop34Data).returning();

    const prop35Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1103 Baylor Street',
        city: 'Austin',
        state: 'TX',
        zip: '78703',
        latitude: '30.2845',
        longitude: '-97.7556',
        minPrice: '1550000.00',
        maxPrice: '1550000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.5',
        sqft: 3350,
        lotSize: '0.27',
        yearBuilt: 2020,
        propertyType: 'house' as const,
        description: 'Exquisite Old West Austin home with timeless appeal. Custom millwork, coffered ceilings, butler\'s pantry, wine cellar, outdoor fireplace and kitchen.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/35',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 219,
    };

    const [prop35] = await db.insert(properties).values(prop35Data).returning();

    const prop36Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '7309 Grover Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78757',
        latitude: '30.3389',
        longitude: '-97.7223',
        minPrice: '515000.00',
        maxPrice: '515000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.0',
        sqft: 1600,
        lotSize: '0.13',
        yearBuilt: 2014,
        propertyType: 'house' as const,
        description: 'Cute North Lamar home with easy access to everything. Updated throughout, open kitchen and living, separate laundry room, carport, low-maintenance yard.',
        features: ['granite_counters', 'stainless_appliances'],
        images: [
            'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
            'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/36',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 68,
    };

    const [prop36] = await db.insert(properties).values(prop36Data).returning();

    const prop37Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '360 Nueces Street',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2667',
        longitude: '-97.7478',
        minPrice: '4800.00',
        maxPrice: '4800.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.5',
        sqft: 1850,
        lotSize: '0.00',
        yearBuilt: 2023,
        propertyType: 'condo' as const,
        description: 'Stunning Warehouse District penthouse. Two-story layout with den, private terrace with downtown views, floor-to-ceiling glass, resort amenities.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
            'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800',
            'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/37',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 367,
    };

    const [prop37] = await db.insert(properties).values(prop37Data).returning();

    const prop38Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '8914 Fern Bluff Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78726',
        latitude: '30.4612',
        longitude: '-97.8234',
        minPrice: '780000.00',
        maxPrice: '780000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '3.0',
        sqft: 2700,
        lotSize: '0.26',
        yearBuilt: 2017,
        propertyType: 'house' as const,
        description: 'Beautiful Round Rock home in gated community. Formal dining, study with French doors, game room, covered patio, community amenities include pool and trails.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
            'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
            'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/38',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 118,
    };

    const [prop38] = await db.insert(properties).values(prop38Data).returning();

    const prop39Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1610 East 4th Street',
        city: 'Austin',
        state: 'TX',
        zip: '78702',
        latitude: '30.2656',
        longitude: '-97.7289',
        minPrice: '2900.00',
        maxPrice: '2900.00',
        isAuction: false,
        bedrooms: 1,
        bathrooms: '1.0',
        sqft: 800,
        lotSize: '0.00',
        yearBuilt: 2022,
        propertyType: 'condo' as const,
        description: 'Trendy East Austin micro-loft. Murphy bed system, efficient kitchen, modern bath, bike storage, walk to restaurants, bars, and entertainment.',
        features: ['stainless_appliances', 'granite_counters'],
        images: [
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
            'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/39',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 187,
    };

    const [prop39] = await db.insert(properties).values(prop39Data).returning();

    const prop40Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '2807 Windsor Road',
        city: 'Austin',
        state: 'TX',
        zip: '78703',
        latitude: '30.2889',
        longitude: '-97.7598',
        minPrice: '2250000.00',
        maxPrice: '2250000.00',
        isAuction: false,
        bedrooms: 5,
        bathrooms: '4.5',
        sqft: 4800,
        lotSize: '0.45',
        yearBuilt: 2021,
        propertyType: 'house' as const,
        description: 'Spectacular Pemberton Heights estate. Grand foyer, chef\'s kitchen with commercial appliances, primary suite with sitting area, infinity pool with water features.',
        features: ['pool', 'hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/40',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 312,
    };

    const [prop40] = await db.insert(properties).values(prop40Data).returning();

    const prop41Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '4205 Duval Street',
        city: 'Austin',
        state: 'TX',
        zip: '78751',
        latitude: '30.3045',
        longitude: '-97.7278',
        minPrice: '935000.00',
        maxPrice: '935000.00',
        isAuction: false,
        bedrooms: 3,
        bathrooms: '2.5',
        sqft: 2350,
        lotSize: '0.17',
        yearBuilt: 2019,
        propertyType: 'house' as const,
        description: 'Stylish Hyde Park home with modern conveniences. Split floor plan, quartz counters, spa shower, covered back porch, xeriscaped front yard.',
        features: ['hardwood_floors', 'granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800',
            'https://images.unsplash.com/photo-1599809275854-e6114a1f2e3e?w=800',
            'https://images.unsplash.com/photo-1599809275946-ab7d20c6d4c0?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/41',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 143,
    };

    const [prop41] = await db.insert(properties).values(prop41Data).returning();

    const prop42Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1505 West 6th Street',
        city: 'Austin',
        state: 'TX',
        zip: '78703',
        latitude: '30.2712',
        longitude: '-97.7534',
        minPrice: '3600.00',
        maxPrice: '3600.00',
        isAuction: false,
        bedrooms: 2,
        bathrooms: '2.0',
        sqft: 1500,
        lotSize: '0.00',
        yearBuilt: 2023,
        propertyType: 'condo' as const,
        description: 'Luxury West 6th condo with high-end finishes. Open concept, designer lighting, Italian tile, balcony, valet parking, dog park, fitness studio.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets', 'security_system'],
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/42',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 245,
    };

    const [prop42] = await db.insert(properties).values(prop42Data).returning();

    const prop43Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '9218 Anderson Mill Road',
        city: 'Austin',
        state: 'TX',
        zip: '78729',
        latitude: '30.4623',
        longitude: '-97.8045',
        minPrice: '595000.00',
        maxPrice: '595000.00',
        isAuction: false,
        bedrooms: 4,
        bathrooms: '2.5',
        sqft: 2350,
        lotSize: '0.19',
        yearBuilt: 2016,
        propertyType: 'house' as const,
        description: 'Wonderful Northwest Austin home in excellent school district. Bright and airy floor plan, breakfast nook, large game room, covered patio with ceiling fan.',
        features: ['granite_counters', 'stainless_appliances', 'walk_in_closets'],
        images: [
            'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800',
            'https://images.unsplash.com/photo-1600563440091-e77fd47c9cfd?w=800',
            'https://images.unsplash.com/photo-1600563439775-3f2f8358a0e8?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/43',
        isResidential: true,
        status: 'buy' as const,
        viewCount: 95,
    };

    const [prop43] = await db.insert(properties).values(prop43Data).returning();

    const prop44Data = {
        agentId: agent1.id,
        agencyId: agency1.id,
        address: '1712 Lavaca Street',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        latitude: '30.2745',
        longitude: '-97.7445',
        minPrice: '2500.00',
        maxPrice: '2500.00',
        isAuction: false,
        bedrooms: 1,
        bathrooms: '1.0',
        sqft: 720,
        lotSize: '0.00',
        yearBuilt: 2021,
        propertyType: 'condo' as const,
        description: 'Downtown studio with urban lifestyle. Modern finishes, Murphy bed, compact kitchen, secure building, rooftop deck, walk to Capitol and offices.',
        features: ['stainless_appliances', 'granite_counters'],
        images: [
            'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
            'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        ],
        virtualTourUrl: 'https://example.com/tour/44',
        isResidential: true,
        status: 'rent' as const,
        viewCount: 167,
    };

    const [prop44] = await db.insert(properties).values(prop44Data).returning();


    const residentialProps = [prop1, prop2, prop3, prop4];

    // Note: Commercial properties section removed as requested

    // 5. Create Inquiries
    // await db.insert(inquiries).values([
    //     {
    //         propertyId: residentialProps[0].id,
    //         agentId: agent1.id,
    //         name: 'Robert Williams',
    //         email: 'robert.williams@email.com',
    //         phone: '(555) 777-8888',
    //         message: 'I\'m very interested in this property. Would love to schedule a viewing this weekend. Are Saturday mornings available?',
    //         inquiryType: 'viewing',
    //         preferredContactMethod: 'phone',
    //         status: 'new',
    //     },
    //     {
    //         propertyId: residentialProps[0].id,
    //         agentId: agent1.id,
    //         name: 'Jennifer Taylor',
    //         email: 'jennifer.taylor@email.com',
    //         phone: '(555) 888-9999',
    //         message: 'Can you provide more information about the school district and neighborhood amenities?',
    //         inquiryType: 'more_info',
    //         preferredContactMethod: 'email',
    //         status: 'contacted',
    //         agentRespondedAt: new Date('2024-10-20T14:30:00Z'),
    //     },
    //     {
    //         propertyId: residentialProps[1].id,
    //         agentId: agent1.id,
    //         name: 'James Anderson',
    //         email: 'james.anderson@email.com',
    //         phone: '(555) 999-0000',
    //         message: 'This is exactly what we\'ve been looking for! We\'d like to submit an offer. Please contact me ASAP.',
    //         inquiryType: 'offer',
    //         preferredContactMethod: 'phone',
    //         status: 'in_progress',
    //         agentRespondedAt: new Date('2024-10-21T09:15:00Z'),
    //         notes: 'Pre-qualified buyers, very motivated. Scheduling showing for tomorrow.',
    //     },
    //     {
    //         propertyId: residentialProps[2].id,
    //         agentId: agent2.id,
    //         name: 'Lisa Martinez',
    //         email: 'lisa.martinez@email.com',
    //         phone: '(555) 000-1111',
    //         message: 'First-time buyer here. What are the HOA fees and what do they cover?',
    //         inquiryType: 'more_info',
    //         preferredContactMethod: 'email',
    //         status: 'new',
    //     },
    //     {
    //         propertyId: residentialProps[1].id,
    //         agentId: agent1.id,
    //         name: 'Michael Chang',
    //         email: 'mchang@email.com',
    //         phone: '(555) 123-4567',
    //         message: 'Interested in participating in the auction. Can you send me the auction details and terms?',
    //         inquiryType: 'more_info',
    //         preferredContactMethod: 'email',
    //         status: 'new',
    //     },
    // ]);

    // 6. Create some Favorites
    await db.insert(favorites).values([
        { userId: user1.id, propertyId: residentialProps[1].id },
        { userId: user2.id, propertyId: residentialProps[0].id },
        { userId: user2.id, propertyId: residentialProps[2].id },
    ]);

    console.log('✅ Seed completed successfully!');
    console.log(`   - ${3} agencies created`);
    console.log(`   - ${5} users created`);
    console.log(`   - ${4} agents created`);
    console.log(`   - ${4} residential properties created`);
    console.log(`   - ${5} inquiries created`);
    console.log(`   - ${3} favorites created`);
}

seed()
    .catch((error) => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });