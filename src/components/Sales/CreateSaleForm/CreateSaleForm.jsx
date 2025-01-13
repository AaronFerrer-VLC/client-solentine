import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import saleServices from '../../../services/sale.services';

const CreateSaleForm = ({ onSaleSaved, onClose }) => {
    const [formData, setFormData] = useState({
        Id: "",
        Día: "",
        Mes: "",
        MImp: "",
        Año: "",
        Fecha: "",
        Negocio: "",
        Zona: "",
        Marca: "",
        Cliente: "",
        Importe: "",
        Comercial: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.Id || !formData.Día || !formData.Mes || !formData.Año || !formData.Fecha) {
            setError("Por favor, complete todos los campos requeridos.");
            return;
        }

        try {
            await saleServices.saveSale(formData);
            setSuccess("Venta creada con éxito");
            setError("");

            setFormData({
                Id: "",
                Día: "",
                Mes: "",
                MImp: "",
                Año: "",
                Fecha: "",
                Negocio: "",
                Zona: "",
                Marca: "",
                Cliente: "",
                Importe: "",
                Comercial: "",
            });
            onSaleSaved();
            onClose();

        } catch (err) {
            setError("Hubo un error al crear la venta. Inténtelo nuevamente.");
            setSuccess("");
        }
    };

    return (
        <div>
            <h2>Crear Venta</h2>
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
                        type="text"
                        name="Zona"
                        value={formData.Zona}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        type="text"
                        name="Marca"
                        value={formData.Marca}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Cliente">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        name="Cliente"
                        value={formData.Cliente}
                        onChange={handleChange}
                        required
                    />
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
                        type="text"
                        name="Comercial"
                        value={formData.Comercial}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Crear Venta
                </Button>
            </Form>
        </div>
    );
};

export default CreateSaleForm;
