import { StyleSheet } from "react-native";
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
    fontWeight: "bold",
  },
  filterDivider: {
    height: 8,
    backgroundColor: "#EDEDED",
    marginHorizontal: -20,
  },
  divider: {
    height: 2,
    backgroundColor:"#EDEDED",
    marginHorizontal: -20,
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
    marginVertical: 50,
    fontSize: 17,
    color: "#333",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    marginHorizontal: -20,
  },
  glowEffect: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 60,
    top: -60,
  },
  navItem: {
    alignItems: "center",
    zIndex: 1,
  },
  addButtonContainer: {
    alignItems: "center",
    marginTop: -30,
    zIndex: 2,
  },
  addButton: {
    backgroundColor: "#00C853",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 12,
    color: "#9a9898ff",
    marginTop: 4,
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
