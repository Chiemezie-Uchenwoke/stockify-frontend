import dashboardStat from "../../../data/dashboardStat";
import DashboardStatCard from "../DashboardStatCard";

const DashboardView = () => {
    return (
        <div className="">
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

        </div>
    )
};

export default DashboardView;