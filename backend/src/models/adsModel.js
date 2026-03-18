import pool from "../config/db";

export const getAllAdsService=async ()=>{
    const result =await pool.query('SELECT * FROM ads')
    return result.rows;
}
export const createAdsService=async(title,category,description,created_by)=>{
    const result =await pool.query('INSERT INTO ads (title,category,description,created_by) VALUES($1,$2,$3,$4) RETURNING *' ,[title,category,description,created_by])
    console.log("Created Ad ",result.rows[0]);
    return result.rows[0];
}

export const deleteAdsService=async (adId)=>{
    const result =await pool.query('DELETE FROM ads where ad_id=$1 RETURNING *',[adId])
    console.log("Deleted ad id",adId)
    return result.rows[0];
}


export const updateAdsService=async(adId,title,category,description)=>{
    const result =await pool.query('UPDATE ads SET title=$1 , category=$2 , description=$3 WHERE ad_id=$4' ,[title,category,description,adId])
    console.log("Updated ad",result.rows[0]);
    return result.rows[0];
}

