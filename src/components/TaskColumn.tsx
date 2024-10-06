import { Task } from "../types/Task";
import { Droppable } from "@hello-pangea/dnd";
import React from "react";
import { Col } from "react-bootstrap";
import TaskCard from "./TaskCard";
import styled from "styled-components";

interface TaskColumnProps {
    tasks: Task[];
    status: string;
};


const TaskColumn: React.FC<TaskColumnProps> = ({ tasks, status }) => {
    return (
        <Col>
            <h4 className="text-center">{status}</h4>
            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? "lightblue" : "white",
                            padding: "8px",
                            margin: "8px",
                            borderRadius: "8px",
                        }}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Col>
    );
};

export default TaskColumn;


