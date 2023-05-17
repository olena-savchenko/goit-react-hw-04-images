import axios from 'axios';

export const getImages = async (value, page) => {
  const url = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '34262951-eeadf584ea4d5f3050a02718a',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  };

  const response = await axios.get(url, options);
  return response.data;
};
