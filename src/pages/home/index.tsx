import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as TaskService from "../../services/TaskService";
import { Task } from "../../services/TaskService";

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

export default function Home() {
  const navigation = useNavigation<NavigationProp>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTask, setMenuTask] = useState<Task | null>(null);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    const tasksFromApi = await TaskService.getTasks();
    console.log("TAREFAS RECEBIDAS PELA TELA HOME:", tasksFromApi);
    setTasks(tasksFromApi);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadTasks();
    });
    return unsubscribe;
  }, [navigation]);

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

  const handleLogin = () => {
    navigation.navigate("Login" as never);
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

  const handleDelete = async () => {
    if (menuTask) {
      await TaskService.deleteTask(menuTask.id);
      closeMenu();
      await loadTasks();
    }
  };

  const handleAddTask = async (title: string) => {
    if (!title.trim()) return;
    await TaskService.createTask(title);
    setCreateModalVisible(false);
    await loadTasks();
  };

  const handleSaveTask = async (taskToUpdate: Task, newTitle: string) => {
    await TaskService.updateTask(taskToUpdate.id, { title: newTitle });
    setEditModalVisible(false);
    await loadTasks();
  };
  const toggleTaskDone = async (taskId: string) => {
    const taskToToggle = tasks.find((t) => t.id === taskId);
    if (taskToToggle) {
      await TaskService.updateTask(taskId, { done: !taskToToggle.done });
      await loadTasks();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00C853" />
      </SafeAreaView>
    );
  }

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

      <StyledText style={styles.dateText}>
        {new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </StyledText>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity
              style={styles.taskContent}
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
                style={[styles.taskText, item.done && styles.taskTextDone]}
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setCreateModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="#fff" />
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

  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
