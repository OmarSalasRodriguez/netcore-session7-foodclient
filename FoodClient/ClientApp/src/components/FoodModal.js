

import { useEffect, useState } from "react";
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form } from "reactstrap";

const foodModel = {
    Id: 0,
    Name: "",
    Description: "",
    Price: 0,
};

const PersonaModal = ({ showModal, setShowModal, saveFood, edit, setEdit, updateFood }) => {
    const [food, setFood] = useState(foodModel);

    const updateForm = (e) => {
        setFood({
            ...food,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (edit != null) {
            setFood(edit);
        } else {
            setFood(foodModel);
        }
    }, [edit]);

    const closeModal = () => {
        setShowModal(!showModal);
        setEdit(null);
    };


    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {food.Id === 0 ? "Nuevo" : "Editar"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                            name="Name"
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => updateForm(e)}
                            value={food.Name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input
                            name="Description"
                            type="text"
                            placeholder="Descripción"
                            onChange={(e) => updateForm(e)}
                            value={food.Description}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Precio</Label>
                        <Input
                            name="Price"
                            type="number"
                            placeholder="Precio"
                            onChange={(e) => updateForm(e)}
                            value={food.Price}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={food.Id === 0 ? (e) => saveFood(food) : (e) => updateFood(food)}>{food.Id === 0 ? 'Guardar' : 'Actualizar'}</Button>
                <Button color="danger" size="sm" className="me-2" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PersonaModal;