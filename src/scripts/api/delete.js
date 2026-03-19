import axios from 'axios';

export async function deleteUser(apiUrl, id) { 
  try{
    const response = await axios.delete(`${apiUrl}/${id}`);


    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to delete user"
    );
  }
}