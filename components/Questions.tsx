'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Questions = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const answer = await askQuestion(value)
        setResponse(answer)
        setValue('')
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="Ask a question"
                    disabled={loading}
                    className="border border-black/20 px-4 py-2 text-lg rounded-lg"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-4 text-white"
                >
                    Ask
                </button>
            </form>
            {/* {loading && <div>...loading answer</div>} */}
            {<div className="bg-white rounded-lg p-4 m-4
            shadow-lg w-[40%] text-justify text-black/90">
                {!loading && !response &&
                    <div className="text-black/80">
                        Here you can ask a question about your journal,
                        <br />
                        For example ask: <b><i>"How was my week?"</i></b>
                    </div>
                }

                {loading &&
                    <div className="flex">
                        Waiting for your answer...
                        <br />
                        {'Please be patient :)'}
                    </div>
                }

                {response &&
                    <div><b>Here is your answer:</b><br />{response}</div>
                }
            </div>}
        </div>
    )
}

export default Questions