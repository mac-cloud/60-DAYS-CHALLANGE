import React, {useState, useEffect} from 'react';
import '../styles/Style.css';
import axios from 'axios';

const Gallery = () => {
    const [categories, setCategories] = useState([]);  
   
 
    //fetch categories
    useEffect(() => {
      const fetchCategories = async () => {
        
        try {
          const response = await axios.get('http://localhost:5000/categories');
          setCategories(response.data);

          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
          const data = await response.json();
          setCategories(data);

        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    },[]);

   
    return (
        <div>
          <h4>Tourist Site in Kenya</h4>
          <div>
          <div className="section">
            <h2>Gallery</h2>

            <div className="categories">
              {categories.length === 0 ? (
                <p>No categories available</p> // Display message if no categories
              ) : (
                categories.map((category) => (
                  <div key={category._id} className="category">
                    <h3>{category.name}</h3>
                    <div className="parks">
                      {category.parks.length === 0 ? (
                        <p>No parks available for this category</p> // Display message if no parks
                      ) : (

                        
                        category.parks.map((park) => (
                          <div key={park._id} className="park">
                            <h4>{park.name}</h4>
                            <p>{park.description}</p>
                            <img src={park.image} alt={park.name} />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
      
      </div>
    </div>
      );
    };
    

export default Gallery