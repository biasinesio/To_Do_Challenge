import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as TaskService from "../../services/TaskService";
import { Task } from "../../services/TaskService";
import * as AuthService from "../../services/AuthService";

import { styles } from "../home/styles";

import TaskModal from "../../Components/TaskModal";
import ActionMenu from "../../Components/ActionMenuModal";
import CreateTaskModal from "../../Components/CreateTaskModal";
import EditTaskModal from "../../Components/EditTaskModal";
import StyledText from "../../Components/StyledText";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Home: { user: AuthService.User };
  Register: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeRouteProp = RouteProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<HomeRouteProp>();
  const { user } = route.params;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTask, setMenuTask] = useState<Task | null>(null);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [menuPositionY, setMenuPositionY] = useState(0);

  const rawDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
  if (loading) {
  }

  const loadTasks = async () => {
    setLoading(true);
    const tasksFromApi = await TaskService.getTasks(user.id);
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

  const openMenu = (task: Task, yPosition: number) => {
    setMenuTask(task);
    setMenuPositionY(yPosition);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuTask(null);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
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
    if (!menuTask) return;

    closeMenu();

    Alert.alert(
      "Confirmar Exclusão",
      "Tem a certeza que deseja excluir esta tarefa?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await TaskService.deleteTask(menuTask.id);
            await loadTasks();
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleAddTask = async (title: string) => {
    if (!title.trim()) return;
    await TaskService.createTask(title, user.id);
    setCreateModalVisible(false);
    await loadTasks();
  };

  const handleSaveTask = async (taskToUpdate: Task, newTitle: string) => {
    await TaskService.updateTask(taskToUpdate.id, { title: newTitle });
    setEditModalVisible(false);
    await loadTasks();
  };

  const toggleTaskDone = async (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, done: !task.done, updatedAt: new Date().toISOString() } // Inverte o 'done' e atualiza a data
          : task
      )
    );
    const taskToToggle = tasks.find((t) => t.id === taskId);
    if (taskToToggle) {
      await TaskService.updateTask(taskId, { done: !taskToToggle.done });
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
      <View style={styles.filterSectionContainer}>
        <StyledText style={styles.filterTitle} fontWeight="bold">
          Filtrar
        </StyledText>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.activeFilter,
            ]}
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
      </View>

      <View style={styles.filterDivider} />

      <StyledText style={styles.dateText} fontWeight="bold">
        {formattedDate}
      </StyledText>

      <View style={styles.divider} />

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
            <TouchableOpacity
              onPress={(event) => {
                event.currentTarget.measure(
                  (x, y, width, height, pageX, pageY) => {
                    openMenu(item, pageY);
                  }
                );
              }}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#555" />
            </TouchableOpacity>
          </View>
        )}
      />

      <StyledText style={styles.counter} fontWeight="bold">
        Total de tarefas:{" "}
        <StyledText style={{ color: "#00C853" }} fontWeight="bold">
          {tasks.filter((t) => t.done).length}/{tasks.length}
        </StyledText>
      </StyledText>

      <View style={styles.navbar}>
        <LinearGradient
          colors={["transparent", "rgba(0, 200, 83, 0.2)"]}
          style={styles.glowEffect}
        />

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#00C853" />
          <StyledText style={{ color: "#00C853" }}>Home</StyledText>
        </TouchableOpacity>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCreateModalVisible(true)}
          >
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
          <StyledText style={styles.addButtonText}>Adicionar</StyledText>
        </View>

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
        positionY={menuPositionY}
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
