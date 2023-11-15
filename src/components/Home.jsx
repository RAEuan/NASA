import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';

const Home = () => {
    const [image, setImage] = useState([])
    
    useEffect(() =>{
        const fetchData = async () => {
            try {
              const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=zarzFBt94hSa5yBWpPTh9wj238dgmk9uGULcF2F2&count=50'); // Reemplaza con tu URL
              //console.log(response)
                setImage(response.data); // Almacena los datos en el estado
                setAllImages(response.data);
            } catch (error) {
              console.error('Error al obtener datos:', error);
            }
          };
          fetchData()
    },[])

const results = [];

const [allImages, setAllImages] = useState([])
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

const handleSelect = (date) =>{
    console.log(allImages)
    let filtered = allImages.filter((imagenes)=>{
        let productDate = new Date(imagenes.date);
        return (
            productDate >= date.selection.startDate && productDate <= date.selection.startDate
        );
    });
    setStartDate(date.selection.startDate)
    setEndDate(date.selection.endDate)
    setImage(filtered);
}

const [currentPage, setCurrentPage] = useState(1)
const MaxImage = 5;
const lastItems = currentPage * MaxImage;
const firstItems = lastItems - MaxImage;
const Pages = image.slice(firstItems, lastItems);
const nPages = Math.ceil(image.length / MaxImage)
const numbers = [...Array(nPages + 1).keys()].slice(1)

function prevPage(){
    if(currentPage !== firstItems){
        setCurrentPage(currentPage - 1)
    }
}

function changePage(id){
    setCurrentPage(id)
}

function nextPage(){
    if(currentPage !== lastItems){
        setCurrentPage(currentPage + 1)
    }
}

    return (
        <div>
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}/>
        <br/>
        <br/>
        <br/>
            {Pages.map((images, index) => {
                return (
                <div key={index}>
                    <table className='table'>
                        <td className='title'><h2>{images.title}</h2></td>
                        <td className='date'><h2>{images.date}</h2></td>
                        <td><img src={images.url} className='imagen'/></td>
                    </table>
                </div>
                );
            })}
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prevPage}>Prev</a>
                    </li>
                    {numbers.map((n, i)=>(
                        <li className={`pagination-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href='#' className='page-link' onClick={()=> changePage(n)}>{n}</a>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>


            {results}
        </div>
    )
}

export default Home