import React , { useState} from 'react';
import axios from 'axios';
import '../Styles/style.css';

const AdminDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [showGallery, setShowGallery] = useState(true);
   

    const toggleGallery = () => setShowGallery(!showGallery);
  
    const addCategory = async () => {
      if (categoryName.trim()) {
        
        try {
          
          const response = await axios.post('http://localhost:5000/api/addcategories', {
            name: categoryName
         
        });

     
          const newCategory =  response.data;
          setCategories ([...categories, newCategory]);
          setCategoryName('');
          alert('Category added successfully!');
          console.log('Category saved:', newCategory);
        } catch (error) {
          console.error('Error saving category:', error);
        }
      } else {
        alert('Please enter a category name.');
      }
    };


    const addPark = async (categoryId, parkName, parkDesc, parkImg) => {
        if (parkName.trim() && parkDesc.trim() && parkImg) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const newPark = { 
                  name: parkName.trim(), 
                  description: parkDesc.trim(), 
                  image: reader.result 
                };

                try {
                    const response = await axios.post('http://localhost:5000/api/parks', {
                          categoryId: categoryId, 
                          park: newPark 
                        }, {
                          headers: { 'Content-Type': 'application/json' }
                        });
                    const updatedCategory = response.data;
                    setCategories(categories.map(cat => 
                      cat._id === updatedCategory._id ? updatedCategory : cat
                    ));
                    alert('Park added successfully!')
                    console.log('Park saved: ', updatedCategory);
                } catch (error) {
                    console.error('Error saving park:', error);
                }
            };
            reader.readAsDataURL(parkImg);
        } else {
            alert('Please fill all park details');
        }
    };

    return (
        <div className="admin-dashboard">
          <div className="sidebar">
            <a href="/dashboard">Dashboard</a>
            <button onClick={toggleGallery}>Gallery</button>
            <a href="/users">Users</a>
            <a href="/metric">Metrics</a>
            <a href="/payments">Payments</a>
            <a href="/notification">Notifications</a>
            <a href="/emails">Emails</a>
            <a href="/calls">Calls</a>
          </div>
          
          <div className="content">
            <h1>Admin Dashboard</h1>
            
            {showGallery && (
              <div className="section">
                <h2>Gallery</h2>
                <h3>Add New Category</h3>
                <div className="form-group">
                  <label htmlFor="category-name">Category Name</label>
                  <input 
                    type="text" 
                    id="category-name" 
                    value={categoryName} 
                    onChange={(e) => setCategoryName(e.target.value)} 
                    placeholder="Enter category name" 
                  />
                </div>
                <button className="btn" onClick={addCategory}>Add Category</button>
                
                <div className="categories">
                  {categories.map((category) => (
                    <div key={category._id} className="category">
                      <h3>{category.name}</h3>
                      <div className="form-group">
                        <input 
                          type="text" 
                          placeholder="Park Name" 
                          id={`park-name-${category._id}`} 
                        />
                        <input 
                          type="text" 
                          placeholder="Park Description" 
                          id={`park-desc-${category._id}`} 
                        />
                        <input 
                          type="file" 
                          id={`park-img-${category._id}`} 
                        />
                      </div>
                      <button 
                        className="btn" 
                        onClick={() => {
                          const parkName = document.getElementById(`park-name-${category._id}`).value;
                          const parkDesc = document.getElementById(`park-desc-${category._id}`).value;
                          const parkImg = document.getElementById(`park-img-${category._id}`).files[0];
                          addPark(category._id, parkName, parkDesc, parkImg);
                        }}
                      >
                        Add Park
                      </button>
                      <div className="parks">
                        {category.parks.map((park) => (
                          <div key={park._id} className="park">
                            <h4>{park.name}</h4>
                            <p>{park.description}</p>
                            <img src={park.image} alt={park.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    
    export default AdminDashboard;