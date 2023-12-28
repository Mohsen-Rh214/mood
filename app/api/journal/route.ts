import { getUserByClerckId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
    const user = await getUserByClerckId()
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day!' // every new entry will have this content by default !
        }
    })

    revalidatePath('/journal')

    return NextResponse.json({ data: entry })
}