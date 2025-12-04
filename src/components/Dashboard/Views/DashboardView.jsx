import dashboardStat from "../../../data/dashboardStat";
import DashboardStatCard from "../DashboardStatCard";
import RecentBatches from "../recentBatches";

const DashboardView = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    dashboardStat.map((d) => {
                        return (
                            <DashboardStatCard 
                                key={d.id}
                                {...d}
                            />
                        );
                    })
                }
            </div>

            <RecentBatches />

        </div>
    )
};

export default DashboardView;