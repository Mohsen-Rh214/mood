import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts';

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('the mood of the person who wrote the journal entry.'),
        subject: z.string().describe('the subject of the journal entry.'),
        summary: z.string().describe('quick summary of the entire entry.'),
        moodColor: z.string().describe('a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'),
        textColor: z.string().describe('a hexidecimal color code that stands out on the mood color background, a color in the same tone but clearly visible and separate.'),
        negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    })
)

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
            'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })

    const input = await prompt.format({
        entry: content,
    })

    console.log('first ------ >>>: ', input)
    return input
}

export const analyze = async (content) => {
    const input = await getPrompt(content)
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const result = await model.call(input)
    console.log('result: ', result)
}