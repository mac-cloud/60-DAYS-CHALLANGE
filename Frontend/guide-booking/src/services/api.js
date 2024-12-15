import axios from 'axios';


const API_URL = 'http://localhost:5000/api/getguides';

const [imagePreview, setImagePreview] = useState(null);

export const fetchGuides = async () => {
    try {

        const response = await axios.get(API_URL);
        return response.data;
    }catch (error) {
        console.error('Error fetching guides:', error);
        throw error;
    }
};