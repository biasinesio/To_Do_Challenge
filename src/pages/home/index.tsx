import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import TaskModal from "../../Components/TaskModal";
import ActionMenu from "../../Components/ActionMenuModal";
import CreateTaskModal from "../../Components/CreateTaskModal";
import EditTaskModal from "../../Components/EditTaskModal";
import StyledText from "../../Components/StyledText";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function Home() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    navigation.navigate("Login" as never);
  };
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTask, setMenuTask] = useState<Task | null>(null);

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [isEditModalVisible, setEditModalVisible] = useState(false);


  
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Tarefa 1", done: false },
    { id: "2", title: "Tarefa 2", done: true },
    { id: "3", title: "Tarefa 3", done: false },
  ]);

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "done"
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const openMenu = (task: Task) => {
    setMenuTask(task);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuTask(null);
  };

const handleEdit = () => {
  if (menuTask) {
    setEditModalVisible(true); 
     setMenuVisible(false);   
  }
};

  const handleToggleDone = () => {
    if (menuTask) {
      toggleTaskDone(menuTask.id);
      closeMenu();
    }
  };

  const handleDelete = () => {
    if (menuTask) {
      setTasks((prev) => prev.filter((t) => t.id !== menuTask.id));
      closeMenu();
    }
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: String(Date.now()), 
      title: title,
      done: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]); 
    setCreateModalVisible(false); 
  };

  const handleSaveTask = (taskToUpdate: Task, newTitle: string) => {
    setTasks((prevTasks) =>
       prevTasks.map((task) =>
        task.id === taskToUpdate.id ? { ...task, title: newTitle } : task
    )
  );
    setEditModalVisible(false);
    setMenuTask(null); 
  };

  const toggleTaskDone = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };


    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <StyledText
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            Todas
          </StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "todo" && styles.activeFilter,
          ]}
          onPress={() => setFilter("todo")}
        >
          <StyledText
            style={[
              styles.filterText,
              filter === "todo" && styles.activeFilterText,
            ]}
          >
            A fazer
          </StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "done" && styles.activeFilter,
          ]}
          onPress={() => setFilter("done")}
        >
          <StyledText
            style={[
              styles.filterText,
              filter === "done" && styles.activeFilterText,
            ]}
          >
            Feitas
          </StyledText>
        </TouchableOpacity>
      </View>

      {/* Vem da API */}
      <StyledText style={styles.dateText}>Qua. 17 de março de 2021</StyledText>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity
              style={styles.task}
              onPress={() => openModal(item)}
            >
              <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
                <Ionicons
                  name={item.done ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={item.done ? "#00C853" : "#999"}
                />
              </TouchableOpacity>
              <StyledText
                style={[
                  styles.taskText,
                  item.done && {
                    textDecorationLine: "line-through",
                    color: "#999",
                  },
                ]}
              >
                {item.title}
              </StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openMenu(item)}>
              <Ionicons name="ellipsis-vertical" size={20} color="#555" />
            </TouchableOpacity>
          </View>
        )}
      />

      <StyledText style={styles.counter}>
        Total de tarefas:{" "}
        <StyledText style={{ color: "#00C853" }}>
          {tasks.filter((t) => t.done).length}/{tasks.length}
        </StyledText>
      </StyledText>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#00C853" />
          <StyledText style={{ color: "#00C853" }}>Home</StyledText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}
        onPress={() => setCreateModalVisible(true)}>
          <Ionicons name="add" size={30} color="rgba(255, 255, 255, 1)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleLogin}>
          <Ionicons name="log-out-outline" size={22} color="#999" />
          <StyledText style={{ color: "#999" }}>Logout</StyledText>
        </TouchableOpacity>
       </View>

      <TaskModal
        visible={modalVisible}
        onClose={closeModal}
        task={selectedTask}
      />
      <ActionMenu
        visible={menuVisible}
        onClose={closeMenu}
        onEdit={handleEdit}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
      />

       <CreateTaskModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={handleAddTask}
      />

       <EditTaskModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveTask}
        task={menuTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
  },
  activeFilter: {
    backgroundColor: "#00C853",
  },
  filterText: {
    color: "#777",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
  counter: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 14,
    color: "#333",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#00C853",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30, // flutuando
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
