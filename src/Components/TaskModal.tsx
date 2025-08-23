import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

type TaskModalProps = {
  visible: boolean;
  task: { id: string; title: string; done: boolean } | null;
  onClose: () => void;
};

export default function TaskModal({ visible, task, onClose }: TaskModalProps) {
  if (!task) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Descrição</Text>
          <Text style={styles.text}>{task.title}</Text>

          <Text style={styles.title}>Id</Text>
          <Text style={styles.text}>{task.id}</Text>

          <Text style={styles.title}>Data de criação</Text>
          <Text style={styles.text}>17/03/2021</Text>

          <Text style={styles.title}>Última atualização</Text>
          <Text style={styles.text}>17/03/2021</Text>

          <Text style={styles.title}>Status</Text>
          <Text style={styles.text}>{task.done ? "Feita" : "A fazer"}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2c3e50",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: "#7f8c8d",
  },
  button: {
    backgroundColor: "#00C853",
    padding: 15,
    marginTop: 20,
    borderRadius: 30,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});