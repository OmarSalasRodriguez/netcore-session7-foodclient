import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useEffect, useState } from 'react';
import FoodModal from "./components/FoodModal";
import FoodCard from "./components/FoodCard";

const App = () => {
    const [foods, setFoods] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);

    // GET
    const getFoods = async () => {
        const response = await fetch("http://localhost:3000/api/Food");

        if (!response.ok) {
            setFoods([]);
            return;
        }

        const data = await response.json();
        setFoods(data);
    }

    // DELETE
    const deleteFood = async (id) => {
        var confirm = window.confirm("¿Deseas eliminar el alimento?");
        if (!confirm) return;

        const response = await fetch("http://localhost:3000/api/Food/" + id, {
            method: "DELETE",
        });

        if (!response.ok) return window.alert("No se ha podido eliminar el alimento");

        window.alert("Elemento eliminado");
        getFoods();
    };

    // POST
    const saveFood = async (food) => {
        const response = await fetch("http://localhost:3000/api/Food", {
            method: "POST",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                Name: food.Name,
                Description: food.Description,
                Price: food.Price
            }),
        });

        if (!response.ok) {
            window.alert("No se ha podido registrar el alimento");
            return;
        }

        setShowModal(!showModal);
        getFoods();
    };

    // PATCH
    const updateFood = async (food) => {
        const response = await fetch(`http://localhost:3000/api/Food/${food.Id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                Name: food.Name,
                Description: food.Description,
                Price: food.Price
            }),
        });

        if (!response.ok) {
            window.alert("No se ha podido actualizar el alimento");
            return;
        }


        setShowModal(!showModal);
        getFoods();
    };

    useEffect(() => {
        getFoods();
    }, []);


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <h5>Alimentos</h5>
                                <div className="d-flex gap-3">
                                    <Button size="sm" color="success" onClick={() => setShowModal(!showModal)}>Agregar</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody style={{ 'padding': '25px' }}>

                            <FoodCard
                                foods={foods}
                                deleteFood={deleteFood}
                                setEdit={setEdit}
                                setShowModal={setShowModal}
                                showModal={showModal}
                            ></FoodCard>

                        </CardBody>
                    </Card>

                </Col>
            </Row>

            <FoodModal
                showModal={showModal}
                setShowModal={setShowModal}
                saveFood={saveFood}
                edit={edit}
                setEdit={setEdit}
                updateFood={updateFood}
            />
        </Container>
    );
}

export default App;