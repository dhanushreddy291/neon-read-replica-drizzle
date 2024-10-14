import { db } from '@/db/drizzle';
import { pollTable } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const ipAddress = req.headers.get('x-forwarded-for');

    if (ipAddress == null) {
        return NextResponse.json({ message: 'IP address not found!' });
    }

    const { option } = await req.json();

    const existingVote = await db
        .select()
        .from(pollTable)
        .where(eq(pollTable.ipAddress, ipAddress))
        .execute();

    if (existingVote.length > 0) {
        return NextResponse.json({ message: 'You have already voted!' });
    }

    // Insert a new vote
    await db.insert(pollTable).values({
        option: option,
        ipAddress: ipAddress,
    });

    return NextResponse.json({ message: 'Vote submitted successfully!' });
}

export async function GET() {
    const options = await db
        .select({
            count: sql<number>`cast(count(*) as int)`,
            option: pollTable.option,
        })
        .from(pollTable)
        .groupBy(pollTable.option)
        .execute();
    return NextResponse.json(options);
}