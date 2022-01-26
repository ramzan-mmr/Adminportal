import { useState } from "react";
import "./App.css";
import RootStack from "./components/RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
      <RootStack/>
  );
};

export default App;
