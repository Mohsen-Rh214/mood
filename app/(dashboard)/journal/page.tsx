import { prisma } from "@/utils/db"
import { getUserByClerckId } from "@/utils/auth"
import NewEntryCard from "@/components/NewEntryCard"
import EntryCard from "@/components/EntryCard"
import Link from "next/link"
import { analyze } from "@/utils/ai"
import Questions from "@/components/Questions"

const getEntries = async () => {
    const user = await getUserByClerckId()

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        },
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()

    return (
        <div className="p-10 bg-zinc-300/20 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="my-8">
                <Questions />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map(entry => (
                    <Link href={`/journal/${entry.id}`} key={entry.id}>
                        <EntryCard entry={entry} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default JournalPage