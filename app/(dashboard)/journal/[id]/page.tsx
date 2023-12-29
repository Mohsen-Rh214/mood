import Editor from "@/components/Editor"
import { getUserByClerckId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id) => {
    const user = await getUserByClerckId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            },
        },
    })

    return entry
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)
    const analysisData = [
        { name: 'Summary', value: '' },
        { name: 'Subject', value: '' },
        { name: 'Mood', value: '' },
        { name: 'Negative', value: 'False' },
    ]
    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2 p-6 bg-zinc-300/20">
                <Editor entry={entry} />
            </div>
            <div className="border-l border-black/10">
                <div className="bg-blue-300 px-6 py-10">
                    <h2 className="text-2xl">Mood Color</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map(item => (
                            <li
                                className="flex items-center justify-between
                                px-6 py-4 border-t border-b border-black/10"
                                key={item.name}
                            >
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default EntryPage