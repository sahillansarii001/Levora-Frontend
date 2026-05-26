import api from './axios';

export const fetchCourses = async () => {
  try {
    const response = await api.get('/cms/courses');
    const data = response.data.data || [];
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching courses', error);
    return [];
  }
};

export const fetchFaculty = async () => {
  try {
    const response = await api.get('/cms/faculty');
    const data = response.data.data || [];
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching faculty', error);
    return [];
  }
};

export const fetchResults = async () => {
  try {
    const response = await api.get('/cms/results');
    const data = response.data.data || [];
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching results', error);
    return [];
  }
};

export const fetchMaterials = async () => {
  try {
    const response = await api.get('/cms/materials');
    const data = response.data.data || [];
    return data.map(item => ({ ...item, id: item._id }));
  } catch (error) {
    console.error('Error fetching materials', error);
    return [];
  }
};
