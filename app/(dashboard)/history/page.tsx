import HistoryChart from "@/components/HistoryChart"
import { getUserByClerckId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
  const user = await getUserByClerckId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { avg, analyses }
}

const History = async () => {
  const { avg, analyses } = await getData();
  console.log('log: a: ', analyses)

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        {`Avg. Sentiment: ${avg}`}
      </div>
      <div className="w-[60%] h-[60%] self-center justify-self-center">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History