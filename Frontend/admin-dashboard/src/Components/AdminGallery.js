import React , { useState} from 'react';


const AdminDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [showGallery, setShowGallery] = useState(true);
  
    const toggleGallery = () => setShowGallery(!showGallery);
  
    const addCategory = async () => {
      if (categoryName.trim()) {
        const newCategory = { name: categoryName, parks: [] };
        setCategories([...categories, newCategory]);
        setCategoryName('');
        
        try {
          const response = await fetch('http://localhost:5000/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory),
          });
          const result = await response.json();
          console.log('Category saved:', result);
        } catch (error) {
          console.error('Error saving category:', error);
        }
      } else {
        alert('Please enter a category name.');
      }
    };


    const addPark = async (categoryIndex, parkName, parkDesc, parkImg) => {
        if (parkName.trim() && parkDesc.trim() && parkImg) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const newPark = { name: parkName, description: parkDesc, image: ReadableStream.result };
                const updatedCategories = [...categories];
                updatedCategories[categoryIndex].parks.push(newPark);
                setCategories(updatedCategories);

                try {
                    const response = await fetch('http://localhost:5000/api/parks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({ categoryId: categoryIndex, park: newPark }),

                    });
                    const result = await response.json();
                    console.log('Park saved: ', result);
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
            <a href="/metrics">Metrics</a>
            <a href="/payments">Payments</a>
            <a href="/notifications">Notifications</a>
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
                  {categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="category">
                      <h3>{category.name}</h3>
                      <div className="form-group">
                        <input 
                          type="text" 
                          placeholder="Park Name" 
                          id={`park-name-${categoryIndex}`} 
                        />
                        <input 
                          type="text" 
                          placeholder="Park Description" 
                          id={`park-desc-${categoryIndex}`} 
                        />
                        <input 
                          type="file" 
                          id={`park-img-${categoryIndex}`} 
                        />
                      </div>
                      <button 
                        className="btn" 
                        onClick={() => {
                          const parkName = document.getElementById(`park-name-${categoryIndex}`).value;
                          const parkDesc = document.getElementById(`park-desc-${categoryIndex}`).value;
                          const parkImg = document.getElementById(`park-img-${categoryIndex}`).files[0];
                          addPark(categoryIndex, parkName, parkDesc, parkImg);
                        }}
                      >
                        Add Park
                      </button>
                      <div className="parks">
                        {category.parks.map((park, parkIndex) => (
                          <div key={parkIndex} className="park">
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