import { Card } from "react-bootstrap";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/Task";

interface TaskCardProps {
    task: Task;
    index: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>

            {(provided, snapshot) => (
                <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="m-2"
                    style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
                        border: snapshot.isDragging ? "2px solid blue" : "1px solid gray",
                        padding: "8px",
                        margin: "8px",
                        borderRadius: "8px",
                        boxShadow: snapshot.isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
                        cursor: "pointer",
                        transition: "transform 0.24s",

                    }}
                >
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Card.Subtitle className="text-muted text-end">
                            Görevli: {task.assignee}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    )
}

export default TaskCard;
