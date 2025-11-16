import FeaturesCard from "./FeaturesCard";
import featuresData from "../../data/featuresData";
import SectionIntro from "../SectionIntro/SectionIntro";

const Features = () => {
    

    return (
        <section className="mt-16 w-full flex flex-col gap-8 items-center">
            <SectionIntro 
                title={"Powerful Features for Your Business"}
                subTiltle={"Everything you need to manage inventory and track profits efficiently"}
            />

            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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