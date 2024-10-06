import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from "uuid";

interface AddTaskFormProps {
  addTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
    "To Do"
  ); // Durum için state ekledik
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !assignee) {
      setError("Tüm alanların doldurulması gerekmektedir.");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status, 
      assignee,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setAssignee("");
    setStatus("To Do"); 
    setError(null);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow} className="mb-3 ms-3">
        Yeni Görev Ekle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Görev Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Görev Başlığı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Görev başlığını girin"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Görev açıklamasını girin"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAssignee" className="mb-3">
              <Form.Label>Atanan Kişi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Atanan kişiyi girin"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Durum</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Yapılacaklar/To Do" | "Yapılıyor.../In Progress" | "Tamamlandı/Done")
                }
              >
                <option value="Yapılacaklar/To Do">Yapılacaklar/To Do</option>
                <option value="Yapılıyor.../In Progress">Yapılıyor.../In Progress</option>
                <option value="Tamamlandı/Done">Tamamlandı/Done</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="success" type="submit" size="lg">
                Ekle
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskForm;