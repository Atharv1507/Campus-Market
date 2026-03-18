    CREATE TABLE IF NOT EXISTS users(
        id VARCHAR PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at  TIMESTAMP DEFAULT now() 
    )


   CREATE TABLE IF NOT EXISTS users(
            id VARCHAR PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by VARCHAR, 
          -- Defining the relationship
            CONSTRAINT fk_user
            FOREIGN KEY(userid) 
	        REFERENCES users(userid)
	        ON DELETE CASCADE
        )


