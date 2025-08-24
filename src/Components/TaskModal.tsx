import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import { Task } from "../services/TaskService";

type TaskModalProps = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
};

export default function TaskModal({ visible, task, onClose }: TaskModalProps) {
  if (!task) return null;

  const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo", 
  }).format(new Date(dateString));
};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <StyledText style={styles.title} fontWeight="bold">Detalhes da Tarefa</StyledText>
          
          <StyledText style={styles.label} fontWeight="bold">Descrição</StyledText>
          <StyledText style={styles.text}>{task.title}</StyledText>

            <StyledText style={styles.label} fontWeight="bold">ID do Usuário</StyledText>
          <StyledText style={styles.text}>{task.userId}</StyledText>

          <StyledText style={styles.label} fontWeight="bold">Data de criação</StyledText>
          
          <StyledText style={styles.text}>{formatDate(task.createdAt)}</StyledText>

          <StyledText style={styles.label} fontWeight="bold">Última atualização</StyledText>
          
          <StyledText style={styles.text} >{formatDate(task.updatedAt)}</StyledText>

          <StyledText style={styles.label} fontWeight="bold">Status</StyledText>
          <StyledText style={styles.text}>{task.done ? "Concluída" : "A fazer"}</StyledText>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <StyledText style={styles.buttonText} fontWeight="bold">Voltar para o Home</StyledText>
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
   label: {
    fontSize: 12,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    marginTop: 15,
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
    paddingVertical: 15, 
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 32,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});