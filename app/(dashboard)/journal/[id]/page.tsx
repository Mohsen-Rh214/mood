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
        include: {
            analysis: true,
        }
    })

    return entry
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)
    const { mood, summary, moodColor, textColor, subject, negative } = entry?.analysis
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' },
    ]
    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2 p-6 bg-zinc-300/20">
                <Editor entry={entry} />
            </div>
            <div className="border-l border-black/10">
                <div className="px-6 py-10" style={{ backgroundColor: moodColor }}>
                    <h2 className="text-2xl" style={{ color: textColor }}>Mood Color</h2>
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