import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const categoryColors = {
  Food: '#ff6384',
  Entertainment: '#36a2eb',
  Transportation: '#ffce56',
  Housing: '#4bc0c0',
  Utilities: '#9966ff',
  // Add more categories and colors as needed
};

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
    setCategory('');
    setAmount('');
  };

  const chartData = expenses.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.name === curr.category);
    if (index === -1) {
      acc.push({ name: curr.category, amount: curr.amount });
    } else {
      acc[index].amount += curr.amount;
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BudgetSaver</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{ height: 50, width: 150 }}
      >
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Transportation" value="Transportation" />
        <Picker.Item label="Housing" value="Housing" />
        <Picker.Item label="Utilities" value="Utilities" />
        {/* Add more categories as needed */}
      </Picker>
      <Input
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        leftIcon={<Icon name="dollar" size={24} color="black" />}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
      {chartData.length > 0 && (
        <PieChart
          data={chartData.map((item) => ({
            name: item.name,
            population: item.amount,
            color: categoryColors[item.name] || '#000000',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          }))}
          width={300}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
