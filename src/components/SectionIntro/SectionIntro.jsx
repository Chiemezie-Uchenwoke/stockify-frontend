import { motion } from "motion/react" // eslint-disable-line no-unused-vars

const SectionIntro = ({title, subTiltle}) => {
    return (
        <motion.div 
            className="flex flex-col gap-2 w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
        >
            <h2 className="text-center font-bold capitalize text-xl lg:text-3xl">
                {title}
            </h2>

            <p className="text-center text-sm lg:text-base">
                {subTiltle}
            </p>
        </motion.div>
    )
};

export default SectionIntro;