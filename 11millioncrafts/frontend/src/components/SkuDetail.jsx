import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SkuDetail = () => {
    const {skuCode} = useParams();
    const [sku,setSku]=useState({
        productName: '',
        productNumber: '',
        vendorName: '',
        vendorNumber: '',
        cityCode: '',
    });
    useEffect(()=>{
       const collectdata = async () =>{
        const response = await axios.get(`http://localhost:5000/sku/${skuCode}`);
        setSku(response.data);
       } 

       if(skuCode){
        collectdata();
       }

    },[skuCode]);
  return (
    <div>
     <h1> Name:{sku.vendorName}</h1>
     <h1>City code:{sku.cityCode}</h1>
     <h1>SKU code:{sku.skuCode}</h1>
     <h1>Product :{sku.productName}</h1>
    
    </div>
  )
}

export default SkuDetail
