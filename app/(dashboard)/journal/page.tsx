import { prisma } from "@/utils/db"
import { getUserByClerckId } from "@/utils/auth"
import NewEntryCard from "@/components/NewEntryCard"
import EntryCard from "@/components/EntryCard"

const getEntries = async () => {
    const user = await getUserByClerckId()

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()

    return (
        <div className="p-10 bg-zinc-300/20 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="grid grid-col-3 gap-4">
                <NewEntryCard />
                {entries.map(entry => (
                    <EntryCard key={entry.id} entry={entry} />
                ))}
            </div>
        </div>
    )
}

export default JournalPage