import { useEffect, useState } from "react";

const useDistricts = () => {
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data))
    }, [setDistricts])

    useEffect(() => {
        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data))
    }, [setUpazilas])
    return { districts, upazilas };
};

export default useDistricts;