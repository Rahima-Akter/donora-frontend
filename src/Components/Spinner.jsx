import { DNA } from "react-loader-spinner";


const Spinner = () => {
    return (
        <div className="flex justify-center items-center mx-auto mt-44">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default Spinner;