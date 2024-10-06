import { useState } from "react";

import { Task } from "./types/Task";
import { v4 as uuidv4 } from "uuid";
import TaskBoard from "./components/TaskBoard";
import { Container } from "react-bootstrap";
import AddTaskForm from "./components/AddTaskForm";

const taskData = [
  {
    title: "Kendini Açıklama",
    description: "Kendini açıklaman gerekiyor.",
    status: "Yapılacaklar/To Do",
    assignee: "Adam S",
  }, 
  {
    title: "Kendini Açıklama 2",
    description: "Kendini açıklaman gerekiyor.",
    status: "Yapılacaklar/To Do",
    assignee: "Madam S",
  },
  {
    title: "Hafta Sonu Çalışma",
    description: "Hafta sonu çalışma gerekiyor.(React)",
    status: "Yapılıyor.../In Progress",
    assignee: "Yekta K",
  },
  {
    title: "Kitap Okuma",
    description: "Kitap okuma",
    status: "Yapılıyor.../In Progress",
    assignee: "Yücel T",
  },
  {
    title: "Hafta Sonu Çalışma",
    description: "Hafta sonu çalışma gerekiyor.(BackEnd)",
    status: "Tamamlandı/Done",
    assignee: "Selim V",
  },
  {
    title: "TPS Raporları",
    description: "Memoyu aldın mı?",
    status: "Tamamlandı/Done",
    assignee: "Deniz A",
  },
  {
    title: "Kitap Satın Al",
    description: "13 Kitap satın al.",
    status: "Tamamlandı/Done",
    assignee: "Dakota C",
  },
  {
    title: "EşyalarıTaşı",
    description:
      "EşyalarıTaşı.",
    status: "Tamamlandı/Done",
    assignee: "Cemal K",
  },
];

const initialTasks: Task[] = [];

taskData.forEach((task) => {
  initialTasks.push({
    ...task,
    id: uuidv4(),
  });
});

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  return (
    <Container>
      <h1 className="text-center mb-4">Görev Yönetimi/Task Management</h1>
      <AddTaskForm addTask={addTask} />
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </Container>
  );
}

export default App;
