
import { Card, CardTitle, ListGroup, ListGroupItem, CardBody, CardFooter, Button, Badge } from "reactstrap";


const FoodCard = ({ foods, deleteFood, setEdit, showModal, setShowModal }) => {

    const sendData = (contacto) => {
        setEdit(contacto);
        setShowModal(!showModal);
    };

    const data = (
        foods.map((item) => (

            <Card
                key={item.Id}
                style={{

                    'gridColumn': 'span 4 / span 4',
                    'borderRadius': '10px',
                    'overflow': 'hidden'
                }}
            >
                <img
                    alt="Card"
                    src="https://picsum.photos/300/200"
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {item.Name}
                    </CardTitle>
                </CardBody>
                <ListGroup flush>
                    <ListGroupItem>
                        {item.Description}
                    </ListGroupItem>
                    <ListGroupItem>
                            $ {item.Price}
                    </ListGroupItem>
                </ListGroup>
                <CardFooter style={{ 'display': 'flex' }}>
                    <Button color="primary" size="sm" className="me-2" style={{ 'flex': 1 }} onClick={() => sendData(item)}>Editar</Button>
                    <Button color="danger" size="sm" className="me-2" style={{ 'flex': 1 }} onClick={() => deleteFood(item.Id)}>Eliminar</Button>
                </CardFooter>
            </Card>



        ))
    );


    return (<>
        <div style={{ 'display': 'grid', 'gap': '25px', 'gridTemplateColumns': 'repeat(12, minmax(0, 1fr))' }}>
            {data}
        </div>

    </>);
}

export default FoodCard;
