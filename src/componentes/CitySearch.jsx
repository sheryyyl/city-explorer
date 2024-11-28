import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function CitySearch(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.displayLatLon();
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label updateCity>Ingresa tu cuidad</Form.Label>
                    <Form.Control onChange={props.updateCity} placeholder="Enter City" />

                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        ¡Explorar!
                    </Button>
                </div>
            </Form>

        </>
    );

}

export default CitySearch;