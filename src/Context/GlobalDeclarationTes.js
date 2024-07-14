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
        image_url:"",
        name: "",
        release_year: "",
        description:"",
        price:""
      }
    )
  //indikator auto refresh
  const [fetchStatus, setFetchStatus] = useState(true)

  const [currentId, setCurrentId] = useState(-1)
  
  const fetchData = () => {
    axios.get("https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/")
      .then((res) => {
        setData([...res.data])
      })
      .catch((error) => {
        setFetchStatus(false)
      })
  }

  //latest 3 data
  const fetchLatest = () => {
    axios.get('https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/')
      .then((res) => {
        // Sort data by timestamp
        const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Get the latest 3 items
        const latestData = sortedData.slice(0, 3);
        
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
  const handlePrice = (price) => {
    const free = 0
    const a = price > free ?  handleFormatPrice.format(price) : 'free';
    return a;

  } 

  
  const handleSize = (size) => {
    const b = size >=1000 ? size/1000+" GB" : size+" MB";
    return b;

  } 
  const handleAndroid = (is_android_app) => {
    const c = is_android_app > 0 ? "| Android" : "";
    return c;

  } 

  const handleIos = (is_ios_app) => {
    const d = is_ios_app > 0 ? "| Ios" : "";
    return d;

  } 

  const handleDesc = (description) => {
        const length = description?.length; // add a ?. to check if variable is null
        const maxlength = 50;
        const e = length > maxlength ? description.slice(0, maxlength - 1) + '…' : description;
        return e;
  }
  const handlePage = (event) => {
    let idData = parseInt(event.target.value)
    Navigate(`/page/${idData}`)
    setCurrentId(idData)
    axios.get(`https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/${idData}`)
      .then((res) => {
        let data = res.data

        setInput(
          {
            image_url:data.image_url,
            name: data.name,
            release_year: data.release_year,
            description: data.description,
            price:data.price
          }
          
        )
      })
      .catch((error) => {
        setFetchStatus(false)
      })
  }



  let states = {
    data, setData, fetchStatus, setFetchStatus, currentId, setCurrentId, input, setInput}

    let handleFunct = {
        handleAndroid,
        handleDesc,
        handlePrice,
        handleIos,
        handleSize,
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