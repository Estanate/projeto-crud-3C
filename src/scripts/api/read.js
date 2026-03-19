import axios from 'axios';

export async function getUsers(apiUrl) {
  try{
    const response = await axios.get(apiUrl)
    return response.data;
  } catch (error){
    throw new Error(
      error.response?.data?.error || "Failed to fetch users"
    )
  }
}