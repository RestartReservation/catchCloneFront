import React, { useState, useEffect } from 'react';
import { URL_VARIABLE } from "./ExportUrl"; 
import './css/HomeStyle.css'
import {Routes,Route,Link} from "react-router-dom";
import './css/style.css';

const Stores = ({ storeData }) => {
  return (
    <article className="sale-item">   
      <Link to={`/stores/${storeData.id}`}><img
        src="https://www.w3.org/TR/css-flexbox-1/images/computer.jpg"
        alt="You get: a white computer with matching peripherals"
      /></Link>
      <Link to={`/stores/${storeData.id}`}><h1>{storeData.storeName}</h1></Link>
      <p>
        스토어 위치, 카테고리, {storeData.starRate}
      </p>
    </article>
  );
}

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState({total : 0});


  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight &&
      !loading
    ) {
      loadMoreData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`${URL_VARIABLE}stores?page=${page}&size=15`);
    const newData = await response.json();
    setData((prevData) => [...prevData, ...newData.content]);
    setTotalPage((prevState) => {
      prevState.total = newData.totalPages;
      return prevState;
    });
    setLoading(false);
  };
  
  const loadMoreData = () => {
    if (page < totalPage.total - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className='contents-section'>
   <main className="deals">
       {data.map((storeData, index) => (
        <Stores key={index} storeData={storeData} />
      ))}
      {loading && <p>Loading...</p>}
      {/* <Routes>
          <Route path="/store/:id/*" element={<Store />} />
      </Routes> */}
    </main>
    </div>
 
  );
}

export default Home;