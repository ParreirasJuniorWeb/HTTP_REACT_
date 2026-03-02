import { useState, useEffect } from "react";

// 4 - custom hook

export const useFetch = (url) => {

    const [data, setData] = useState(null);

    // 5 - refatorando o post

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(null);

    // 6 - loading

    const [loading, setLoading] = useState(false);

    // 7 -ERROS - TRATAMENTO DE ERROS

    const [error, setError] = useState(null);

    const httpConfig = (data, method) => {

        if(method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            setMethod(method);
        }
    }

    useEffect(() => {

        const fecthData = async () => {

           // 7 - TRATAMENTO DE ERROS 

           try {
             // 6 - loading

            setLoading(true);

            const response = await fetch(url);
            const json = await response.json();

            setData(json);
           } 
           catch (error) {

            console.log(error.message);

            setError("Houve um erro ao executar aplicação!");
           }
           finally {

            setLoading(false);
           }
        };

        fecthData();
    }, [url, callFetch]);

    
    // 5 - refatorando post 

    useEffect(() => {

        const httpRequest = async() => {

            let json;

            if(method === "POST") {

                let fetchOptions = [url, config];

                 // 6 - loading

                setLoading(true);

                const response = await fetch(...fetchOptions);

                json = await response.json();

                setLoading(false);
            }

            setCallFetch(json);
        };

        httpRequest();

    }, [config, method, url]);

    return { data, httpConfig, loading, error }; 
};