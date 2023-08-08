import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const BudgetsScreen = ({ route }) => {
  const { budgets, setBudgets } = route.params;

  const handleUpdateBudget = (category, value) => {
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: parseFloat(value),
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      {Object.keys(budgets).map((category) => (
        <View key={category} style={styles.budgetItem}>
          <Text style={styles.category}>{category}</Text>
          <Input
            value={`${budgets[category]}`}
            onChangeText={(value) => handleUpdateBudget(category, value)}
            keyboardType="numeric"
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  budgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  category: {
    flex: 1,
    fontSize: 18,
  },
});

export default BudgetsScreen;
