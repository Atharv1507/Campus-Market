import pool from "../config/db.js";

export const getAllUsersService=async ()=>{
    const result=await pool.query('SELECT * FROM users')
    console.log('SELECT ALL RESULT:', result.rows[0])
    return result.rows
};

export const getAllUserByIdService=async (id)=>{
    const result=await pool.query('SELECT * FROM users WHERE id =$1',[id])
    console.log('SELECT BY ID RESULT:', result.rows[0])
    return result.rows[0]
}

export const createUserService=async (id,name,email)=>{
    const result=await pool.query('INSERT INTO users (id,name,email) values($1,$2,$3) ON CONFLICT (id) DO NOTHING RETURNING *',[id,name,email])
    console.log('INSERT RESULT:', result.rows[0])   
    return result.rows[0]
}

export const deleteUserService=async (id)=>{
    const result= await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',[id])
    console.log('DELETE RESULT:', result.rows[0])
    return result.rows[0]
}

export const updateUserService=async (id,name,email)=>{
    const result=await pool.query("UPDATE users SET name=$1 , email=$2 WHERE id =$3 RETURNING *",[name,email,id] )
    console.log('UPDATE RESULT:', result.rows[0])
    return result.rows[0]
}