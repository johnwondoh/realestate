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