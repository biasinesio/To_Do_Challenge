import { StyleSheet } from "react-native";
import { themas } from '../../global/themes';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
  },
  filterSectionContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterTitle: {
    fontSize: 17,
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 32,
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
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 19,
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
    textAlign: "justify",
    marginVertical: 30,
    fontSize: 17,
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
    marginTop: -40, 
    shadowColor: "#000",
    shadowOpacity: 0,
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