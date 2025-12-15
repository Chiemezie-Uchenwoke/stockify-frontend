import AddProductsButton from "./AddProductsButton"
import ViewProductsButton from "./ViewProductsButton"

const BatchCard = ({batchName}) => {
    return (
        <div>
            <h3> {batchName} </h3>

            <AddProductsButton />

            <ViewProductsButton />
        </div>
    )
};

export default BatchCard;