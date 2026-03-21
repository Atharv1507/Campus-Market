import pool from "../config/db.js";

export const getAllAdsService=async ()=>{
    const result =await pool.query('SELECT * FROM ads')
    return result.rows;
} 
export const createAdsService=async(title,category,budget,description,created_by,urgency)=>{
    const result =await pool.query('INSERT INTO ads (title,category,budget,description,created_by,urgency) VALUES($1,$2,$3,$4,$5,$6) RETURNING *' ,[title,category,budget,description,created_by,urgency])
    console.log("Created Ad ",result.rows[0]);
    return result.rows[0];
}

export const deleteAdsService=async (adId)=>{
    console.log('Ad id is:'+adId)
    const result =await pool.query('DELETE FROM ads where ad_id=$1 RETURNING *',[adId])
    console.log("Deleted ad id",adId)
    return result.rows[0];
}


export const updateAdsService=async(adId,title,category,budget,description,urgency)=>{
    const result =await pool.query('UPDATE ads SET title=$1 , category=$2, budget=$3 , description=$4 , urgency= $5 WHERE ad_id=$6' ,[title,category,budget,description,urgency,adId])
    console.log("Updated ad",result.rows[0]);
    return result.rows[0];
}

