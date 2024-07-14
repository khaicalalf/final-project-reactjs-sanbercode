import React, { useContext, useEffect } from 'react'
import Hero from '../Component/Hero'
import axios from 'axios'
import { GlobalDeclaration } from '../Context/GlobalDeclaration'
import { useParams } from 'react-router-dom'

const Page = () =>{
    const {idData} = useParams();
  const { states, handleFunct } = useContext(GlobalDeclaration)

  const {
    data, setData, fetchStatus, setFetchStatus, input, setInput} = states
  
  const {
    handlePriceMin,
    handlePriceMax,
    fetchLatest,
    handlePage

} = handleFunct

useEffect(() => {
    if (fetchStatus === true) {
      fetchLatest()
      
    }
  }, [fetchStatus, setFetchStatus])
// useEffect(() => {
//     if(idData !== undefined){

    
//     axios.get(`https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/${idData}`)
//       .then((res) => {
//         let data = res.data

//         setInput(
//           {
//             image_url:data.image_url,
//             name: data.name,
//             release_year: data.release_year,
//             description: data.description,
//             price:data.price
//           }
          
//         )
//       })
//       .catch((error) => {
//         setFetchStatus(false)
//       })
//     }
//   }, [])
  
// console.log(data)
  
return (
  <>
    <section className="py-8 mt-6  bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-full dark:hidden" src={input.company_image_url} alt="" />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {input.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {input.company_name} | {input.company_city} 
                </p>
                
              </div>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            
                <div className="flex items-center gap-2 mt-2 sm:mt-0">   
                  <p className="text-m font-medium leading-none text-gray-500 dark:text-gray-400">
                  {input.job_tenure} | {input.job_status}
                  </p>

                </div>
              </div>
              
              {/* <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
          <a href="#" title className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" role="button">
            <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
            Add to favorites
          </a>
          <a href="#" title className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center" role="button">
            <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
            </svg>
            Add to cart
          </a>
              </div> */}
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
              {handlePriceMin(input.salary_min)} - {handlePriceMax(input.salary_max)} | {input.job_qualification} 
              </p>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {input.job_description}
              </p>
              
            </div>
          </div>
        </div>
    </section>

    <section  className="bg-white py-4 antialiased dark:bg-gray-900 md:py-4">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h4 className="mb-8 text-2xl font-bold tracking-tight text-gray-900     dark:text-white">The latest jobs</h4>
          <div className="mx-auto">
                <div className="grid grid-cols-2 gap-2">
                    { data !== null && data.map((res, index) => {
                        return (
                            <>  
                              <div key={index} className="h-auto max-w-full flex flex-col items-top mb-5 bg-white border border-gray-200   rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700  dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="bg-center bg-landscape  w-full rounded-t-lg h-96 md:h-auto md:w-48     md:rounded-none md:rounded-s-lg" src={res.company_image_url} alt="" />
                                        <div className="w-full flex flex-col justify-between p-4 leading-normal">
                                            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900     dark:text-white">{res.title}</h4>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{res.company_name} | {res.company_city}</p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{res.job_tenure} | {res.job_status} </p>
                                            <div className="flex item-center justify-between mt-3">
                                                <h1 className="text-gray-700 font-bold text-xl">
                                                {handlePriceMin(res.salary_min)} - {handlePriceMax(res.salary_max)}
                                                </h1>
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


export default Page;
