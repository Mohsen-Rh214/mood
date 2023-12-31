const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString()
    const { mood, summary, moodColor, textColor, subject, negative } = entry.analysis

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5">{date}</div>
            <div className="px-4 py-5">{summary}</div>
            <div className="flex justify-between">
                <div className="w-[80%] px-4 py-4 flex justify-between">Mood: 
                <p style={{color: textColor}}>{mood}</p>
                </div>
                <div className="border-l w-[20%] h-14 self-end"
                    style={{ backgroundColor: moodColor }}
                />
            </div>
        </div>
    )
}

export default EntryCard