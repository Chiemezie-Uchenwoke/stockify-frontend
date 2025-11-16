import FeaturesCard from "./FeaturesCard";
import featuresData from "../../data/featuresData";

const Features = () => {
    

    return (
        <section className="mt-16 w-full flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-2">
                <h2 className="text-center font-bold capitalize text-xl lg:text-3xl">
                    Powerful Features for Your Business
                </h2>

                <p className="text-center text-sm lg:text-base">
                    Everything you need to manage inventory and track profits efficiently
                </p>
            </div>

            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    featuresData.map((feature) => {
                        return (
                            <FeaturesCard 
                                key={feature.id}
                                {...feature}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
};

export default Features;