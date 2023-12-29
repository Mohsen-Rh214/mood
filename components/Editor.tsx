'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)

    const { mood, summary, moodColor, textColor, subject, negative } = analysis
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' },
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2 p-8 bg-zinc-300/20">
                {isLoading &&
                    <div>Auto saving...</div>
                }
                <textarea
                    style={{ resize: 'none' }}
                    className="w-full p-8 h-full text-xl outline-none shadow"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
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
                                <span className="text-center">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor