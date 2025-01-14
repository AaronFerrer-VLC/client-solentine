import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import saleServices from '../../../services/sale.services'
import zoneServices from '../../../services/zone.services';
import clientServices from '../../../services/client.services';
import comercialServices from '../../../services/comercial.services';
import brandServices from '../../../services/brand.services'

const CreateSaleForm = ({ onSaleSaved, onClose }) => {
    const [formData, setFormData] = useState({
        Id: "",
        Día: "",
        Mes: "",
        Año: "",
        Fecha: "",
        Negocio: "",
        Zona: "",
        Marca: "",
        Cliente: "",
        Importe: "",
        Comercial: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [zones, setZones] = useState([]);
    const [brands, setBrands] = useState([]);
    const [clients, setClients] = useState([]);
    const [comercials, setComercials] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [zonesData, brandsData, clientsData, comercialsData] = await Promise.all([
                zoneServices.getAllZones(),
                brandServices.getAllBrands(),
                clientServices.getAllClients(),
                comercialServices.getAllComercials()
            ]);

            setZones(zonesData.data);
            setBrands(brandsData.data);
            setClients(clientsData.data);
            setComercials(comercialsData.data);
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saleServices.createSale(formData);
            onSaleSaved();
            onClose();
        } catch (err) {
            console.error('Error al crear la venta:', err);
        }
    };

    return (
        <div className='CreateSaleForm'>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                        type="number"
                        name="Id"
                        value={formData.Id}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </Form.Group>
                <Form.Group controlId="Día">
                    <Form.Label>Día</Form.Label>
                    <Form.Control
                        type="number"
                        name="Día"
                        value={formData.Día}
                        onChange={handleChange}
                        required
                        min="1"
                        max="31"
                    />
                </Form.Group>

                <Form.Group controlId="Mes">
                    <Form.Label>Mes</Form.Label>
                    <Form.Control
                        type="number"
                        name="Mes"
                        value={formData.Mes}
                        onChange={handleChange}
                        required
                        min="1"
                        max="12"
                    />
                </Form.Group>
                <Form.Group controlId="Año">
                    <Form.Label>Año</Form.Label>
                    <Form.Control
                        type="number"
                        name="Año"
                        value={formData.Año}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        name="Fecha"
                        value={formData.Fecha}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Negocio">
                    <Form.Label>Negocio</Form.Label>
                    <Form.Control
                        type="text"
                        name="Negocio"
                        value={formData.Negocio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Zona">
                    <Form.Label>Zona</Form.Label>
                    <Form.Control
                        as="select"
                        name="Zona"
                        value={formData.Zona}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una zona</option>
                        {zones.map((zone) => (
                            <option key={zone._id} value={zone._id}>
                                {zone.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        as="select"
                        name="Marca"
                        value={formData.Marca}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una marca</option>
                        {brands.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                                {brand.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Cliente">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control
                        as="select"
                        name="Cliente"
                        value={formData.Cliente}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un cliente</option>
                        {clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Importe">
                    <Form.Label>Importe</Form.Label>
                    <Form.Control
                        type="number"
                        name="Importe"
                        value={formData.Importe}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Comercial">
                    <Form.Label>Comercial</Form.Label>
                    <Form.Control
                        as="select"
                        name="Comercial"
                        value={formData.Comercial}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un comercial</option>
                        {comercials.map((comercial) => (
                            <option key={comercial._id} value={comercial._id}>
                                {comercial.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Crear Venta
                </Button>
            </Form>
        </div>
    );
};

export default CreateSaleForm;
