import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const Analytics = async () => {
  const { userId } = auth()

  if(!userId) {
    return redirect('/')
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <DataCard 
          label="Total des revenus"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard 
          label="Total des ventes"
          value={totalSales}
        />
      </div>
      <Chart
        data={data}
      />
    </div>
  );
}

export default Analytics;