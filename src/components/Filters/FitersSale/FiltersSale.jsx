import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../Loader/Loader';

const FiltersSale = ({ onChange, onClear }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [filters, setFilters] = useState({
        id: '',
        year: '',
        business: '',
        zone: '',
        brand: '',
        client: '',
        comercial: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onChange(filters);
    };

    const handleClear = () => {
        setFilters({
            id: '',
            year: '',
            business: '',
            zone: '',
            brand: '',
            client: '',
            comercial: ''
        });
        onClear();
    };

    return (
        isLoading ? <Loader /> :
            <div className='FiltersSale'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formId">
                        <Form.Label>ID</Form.Label>
                        <Form.Control name="id" value={filters.id} onChange={handleChange} placeholder="ID" />
                    </Form.Group>
                    <Form.Group controlId="formYear">
                        <Form.Label>Año</Form.Label>
                        <Form.Control name="year" value={filters.year} onChange={handleChange} placeholder="Año" />
                    </Form.Group>
                    <Form.Group controlId="formBusiness">
                        <Form.Label>Negocio</Form.Label>
                        <Form.Control name="business" value={filters.business} onChange={handleChange} placeholder="Negocio" />
                    </Form.Group>
                    <Form.Group controlId="formZone">
                        <Form.Label>Zona</Form.Label>
                        <Form.Control name="zone" value={filters.zone} onChange={handleChange} placeholder="Zona" />
                    </Form.Group>
                    <Form.Group controlId="formBrand">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control name="brand" value={filters.brand} onChange={handleChange} placeholder="Marca" />
                    </Form.Group>
                    <Form.Group controlId="formClient">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Control name="client" value={filters.client} onChange={handleChange} placeholder="Cliente" />
                    </Form.Group>
                    <Form.Group controlId="formComercial">
                        <Form.Label>Comercial</Form.Label>
                        <Form.Control name="comercial" value={filters.comercial} onChange={handleChange} placeholder="Comercial" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Aplicar Filtros
                    </Button>
                    <Button variant="secondary" type="button" onClick={handleClear}>
                        Limpiar Filtros
                    </Button>
                </Form>
            </div>
    );
};

export default FiltersSale;

