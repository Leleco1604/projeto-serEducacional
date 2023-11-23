import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://petstore-demo-endpoint.execute-api.com/petstore/pets');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error);
    }
  };

  const sortBy = (property) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <View>
      <Button title="Ordenar por ID" onPress={() => sortBy('id')} />
      <Button title="Ordenar por Tipo" onPress={() => sortBy('type')} />
      <Button title="Ordenar por Preço" onPress={() => sortBy('price')} />
      {data.map((item) => (
        <View key={item.id}>
          <Text>ID: {item.id}</Text>
          <Text>Tipo: {item.type}</Text>
          <Text>Preço: {item.price}</Text>
          <Text>--------------------</Text>
        </View>
      ))}
    </View>
  );
};

export default App;
