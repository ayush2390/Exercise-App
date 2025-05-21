export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a6107d467amsh0dbe21c17dd43c0p164e6djsna12477fa8354',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};
export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a6107d467amsh0dbe21c17dd43c0p164e6djsna12477fa8354',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async(url, options) =>{
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Re-throw to allow component-level error handling
  }
}