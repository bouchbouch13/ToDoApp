// src/Screen/ToDoScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Alert } from 'react-native';

const ToDoScreen = () => {
  const [tasks, setTasks] = useState([]);  // Liste des tâches
  const [text, setText] = useState('');    // Texte de la nouvelle tâche
  const [search, setSearch] = useState(''); // Texte de recherche
  const [editingIndex, setEditingIndex] = useState(-1); // Index de la tâche en cours de modification

  // Ajouter ou Modifier une tâche
  const handleAddTask = () => {
    if (text.trim() === '') return;

    if (editingIndex > -1) {
      // Modification d'une tâche existante
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = text;
      setTasks(updatedTasks);
      setEditingIndex(-1);
    } else {
      // Ajout d'une nouvelle tâche
      setTasks([...tasks, { id: Date.now().toString(), text }]);
    }

    setText('');  // Réinitialiser le champ de texte
  };

  // Supprimer une tâche
  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Sélectionner une tâche pour la modifier
  const handleEditTask = (index) => {
    setText(tasks[index].text);
    setEditingIndex(index);
  };

  // Rechercher des tâches
  const filteredTasks = tasks.filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDoApp</Text>
      
      <TextInput
        placeholder="Rechercher une tâche..."
        style={styles.searchInput}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <TextInput
        placeholder="Ajouter ou modifier une tâche..."
        style={styles.input}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>{editingIndex > -1 ? 'Modifier' : 'Ajouter'}</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity onPress={() => handleEditTask(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Supprimer la tâche",
                    "Voulez-vous vraiment supprimer cette tâche?",
                    [
                      {
                        text: "Annuler",
                        style: "cancel"
                      },
                      {
                        text: "Supprimer",
                        onPress: () => handleDeleteTask(item.id)
                      }
                    ]
                  )
                }
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#1e90ff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
  },
  editButtonText: {
    color: '#1e90ff',
  },
  deleteButton: {},
  deleteButtonText: {
    color: 'red',
  },
});
