const API_URL = 'http://localhost:5000/items';

export const fetchItems = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addItemToServer = async (item) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return await res.json();
};
