import React, { useState, useEffect } from "react"
import { FormField, Loader, Card } from "../Components"
import axios from "axios"

const Home = () => {
    const [server, setserver] = useState(null)
    const [loading, setloading] = useState(false)
    const [search, setsearch] = useState("")

    let handleevent = e => setsearch(e.target.value)

    const FetchData = async () => {
        setloading(true)
        try {
            const { data } = await axios.get(
                "http://localhost:8000/api/v1/getdata"
            )
            if (data?.sucess) {
                return setserver(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        FetchData()
    }, [])

    
    const getResult = server?.data?.filter(
        e =>
        e?.name.toLowerCase().includes(search.toLowerCase()) ||
        e?.prompt.toLowerCase().includes(search.toLowerCase())
        )
        
    return (
        <>
            <div className="">
                <h1 className="font-extrabold font-inter text-3xl">
                    The Community Showcase
                </h1>
                <p className="text-gray-500 mt-5 mb-8 sm:mb-14">
                    Browse through a collection of imaginative AI-generated images
                </p>

                <div className="w-full mb-12">
                    <FormField
                        name="Search Posts"
                        placeholder="Search Posts"
                        eventFunction={handleevent}
                        required={true}
                        value={search}
                        SupriseMe={false}
                    />
                </div>

                {search && (
                    <div className=" text-left mb-7">
                        <h3 className="text-gray-500 text-xl">
                            Showing results for
                            <span className="text-black"> {search}</span>
                        </h3>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center ">
                        <Loader />
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-4 gap-3 ">
                        {getResult?.map(e => (
                            <Card key={e.id} {...e} />
                        ))}
                    </div>
                )}

                {(getResult?.length == 0 ) && (
                <div className=" font-inter font-bold text-left text-indigo-600 text-xl">
                   NO SEARCH RESULT FOUND
                 </div>
                )}
               
            </div>
        </>
    )
}

export default Home