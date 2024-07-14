import { createContext, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const GlobalDeclaration = createContext()
export const GlobalProvider = (props) => {
  let Navigate = useNavigate();
    const [data, setData] = useState(null)

    const [input, setInput] = useState(
      {
        title:"",
        company_image_url:"",
        company_name:"",
        company_city:"",
        job_tenure:"",
        job_status:"",
        job_description:"",
        job_qualification:"",
        salary_min:"",
        salary_max:""
      }
    )
  //indikator auto refresh
  const [fetchStatus, setFetchStatus] = useState(true)

  const [currentId, setCurrentId] = useState(-1)

  const [error, setError] = useState('');
  
  const fetchData = () => {
    axios.get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setData([...res.data.data])
      })
      .catch((error) => {
        setFetchStatus(false)
        setError('Error fetching data: ' + error.message);
      })
  }

  //latest 3 data
  const fetchLatest = () => {
    axios.get('https://dev-example.sanbercloud.com/api/job-vacancy')
      .then((res) => {
        // Sort data by timestamp
        const sortedData = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Get the latest 3 items
        const latestData = sortedData.slice(0, 2);
        
        setData(latestData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  
  
  


  

  console.log(data)

  const handleFormatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});
  const handlePriceMin = (salary_min) => {
    const a = handleFormatPrice.format(salary_min);
    return a;

  } 
  const handlePriceMax = (salary_max) => {
    const a = handleFormatPrice.format(salary_max);
    return a;

  } 

  
  const handlePage = (event) => {
    let idData = parseInt(event.target.value)
    Navigate(`/page/${idData}`)
    setCurrentId(idData)
    axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
      .then((res) => {
        let data = res.data

        setInput(
          {
            title: data.title,
            company_image_url: data.company_image_url,
            company_name: data.company_name,
            company_city: data.company_city,
            job_tenure: data.job_tenure,
            job_status: data.job_status,
            job_description: data.job_description,
            job_qualification: data.job_qualification,
            salary_min: data.salary_min,
            salary_max: data.salary_max
            
          }
          
        )
      })
      .catch((error) => {
        setFetchStatus(false)
      })
  }



  let states = {
    data, setData, fetchStatus, setFetchStatus, currentId, setCurrentId, input, setInput, error, setError}

    let handleFunct = {
        handlePriceMax,
        handlePriceMin,
        fetchData,
        fetchLatest,
        handlePage
    }
    return(
        <GlobalDeclaration.Provider value={{states, handleFunct
            }}>
                {props.children}
        </GlobalDeclaration.Provider>
    )
}
