import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import InputTask from "./components/InputTask";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';



export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(){
    const response = await fetch("http://192.168.100.14:8080/tasks/1");
    const data = await response.json();
    setTasks(data);
  }

  function clearTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: task.completed === 1 ? 0 : 1 }
          : task
      )
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <SafeAreaView>
            <FlatList
              data={tasks}
              keyExtractor={(task) => `${task.id}`}
              renderItem={({ item }) => (
                <Task {...item} toggleTask={toggleTask} clearTask={clearTask} />
              )}
              ListHeaderComponent={() => (
                <Text style={styles.title}>Today</Text>
              )}
              contentContainerStyle={styles.contentContainerStyle}
            />
            <InputTask tasks={tasks} setTasks={setTasks} />
          </SafeAreaView>
          <StatusBar style="auto" />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  }
});
