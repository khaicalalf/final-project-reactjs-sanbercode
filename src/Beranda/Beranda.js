import React, { useContext, useEffect } from 'react'
import Hero from '../Component/Hero'
import { GlobalDeclaration } from '../Context/GlobalDeclaration'

const Berandates = () =>{
  const { states, handleFunct } = useContext(GlobalDeclaration)

  const {
    data, setData, fetchStatus, setFetchStatus, input, setInput} = states
  
  const {
    handleAndroid,
    handleDesc,
    handlePrice,
    handleIos,
    handleSize,
    fetchData,
    handlePage

} = handleFunct

  
useEffect(() => {
    if (fetchStatus === true) {
      fetchData()
      
    }
  }, [fetchStatus, setFetchStatus])
  

  
return (
  <>
    <Hero/>
      <section id="#job" className="bg-white py-4 my-28 antialiased dark:bg-gray-900 md:py-4">
    
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h4 className="mb-8 text-2xl font-bold tracking-tight text-gray-900     dark:text-white">Find your Job that need you!</h4>
              <div className="mx-auto">
           
                <div className="grid grid-cols-2 gap-2">
                    
                    { data !== null && data.map((res, index) => {
                        return (
                            <>  
                                <div key={index} className="h-auto max-w-full flex flex-col items-top mb-5 bg-white border border-gray-200   rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700  dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="bg-center bg-landscape  w-full rounded-t-lg h-96 md:h-auto md:w-48     md:rounded-none md:rounded-s-lg" src={res.image_url} alt="" />
                                        <div className="w-full flex flex-col justify-between p-4 leading-normal">
                                            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900     dark:text-white">{res.name}</h4>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{res.release_year}</p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{handleDesc(res.description)}</p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{handleSize(res.size)} | {res.category} {handleAndroid(res.is_android_app)}  {handleIos(res.is_ios_app)}</p>
                                            <div className="flex item-center justify-between mt-3">
                                                <h1 className="text-gray-700 font-bold text-xl">
                                                {handlePrice(res.price)}
                                                </h1>
                                                <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                                {res.rating} Ratings
                                                </button>
                                            </div>
                                            <div className="flex item-center justify-between mt-3">
                                                <button onClick={handlePage} value={res.id} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                                Lihat
                                                </button>
                                            </div>
                                            
                                        </div>
                                </div>
                            
                            </>)
                    })}
                </div>
              </div> 
            
          </div>
      </section>
    
    
  </>  


);
}


export default Berandates;
