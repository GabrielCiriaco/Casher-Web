CREATE TABLE transactions (
	id SERIAL PRIMARY KEY,
	data TIMESTAMP,
	description TEXT,
	value FLOAT,
	user_id INT,
	category_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	CONSTRAINT FK_category_id FOREIGN KEY (category_id) REFERENCES categories(id) 
	
)