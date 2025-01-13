import React, { useState, useEffect } from 'react'
import { Modal, Form, Spinner, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import saleServices from '../../../services/sale.services'
import userServices from '../../../services/user.services'
import debounce from 'lodash.debounce'


const GeneralFilter = ({ onResultsFound, setShowFilter }) => {
    const [searchValue, setSearchValue] = useState('')
    const [results, setResults] = useState({
        sales: [],
        users: [],
        clients: [],
        comercials: [],
    });
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const fetchData = debounce(() => {
        setIsLoading(true);
        Promise.all([
            saleServices.filterCommunities(searchValue),
            userServices.filterUsers(searchValue),
        ])
            .then(([saleResults, userResults,]) => {
                setResults({
                    sales: saleResults.data,
                    users: userResults.data,
                })
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false))
    }, 300)

    useEffect(() => {
        if (searchValue.length >= 3) {
            fetchData()
        }
        return fetchData.cancel
    }, [searchValue])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleClick = (type, id) => {
        if (type === 'sale') navigate(`/sales/detalles/${id}`)
        if (type === 'user') navigate(`/usuarios/${id}`)
        setShowFilter(false)
    }

    const getHighlightedResult = () => {
        const { sales, users } = results
        if (sales.length > 0) return { type: 'sale', data: sales[0] }
        if (users.length > 0) return { type: 'user', data: users[0] }
        return null
    }


    const highlightedResult = getHighlightedResult()

    return (
        <Modal show={true} onHide={() => setShowFilter(false)} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Buscar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Buscar ventas, usuarios o clientes..."
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </Form>
                {isLoading ? (
                    <Spinner animation="border" className="mt-3" />
                ) : (
                    <Row className="mt-3">
                        {highlightedResult && (
                            <Col md={6}>
                                <h5>Resultado destacado</h5>
                                <div
                                    className="highlighted-result"
                                    onClick={() =>
                                        handleClick(highlightedResult.type, highlightedResult.data._id)
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    {highlightedResult.type === 'sale' && (
                                        <div>
                                            <h6>{highlightedResult.data.fecha}</h6>
                                            <p>{highlightedResult.data.importe}</p>
                                        </div>
                                    )}
                                    {highlightedResult.type === 'user' && (
                                        <div>
                                            <img
                                                src={highlightedResult.data.avatar || 'default-avatar.png'}
                                                alt={highlightedResult.data.username}
                                                width="100%"
                                                className="mb-2"
                                            />
                                            <h6>{highlightedResult.data.username}</h6>
                                            <p>{highlightedResult.data.sale}</p>
                                        </div>
                                    )}
                                    {highlightedResult.type === 'client' && (
                                        <div>
                                            <h6>{highlightedResult.data.content}</h6>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        )}
                        <Col md={6}>
                            <h5>Otros resultados</h5>
                            <ListGroup>
                                {results.sales.length > 0 && (
                                    <div>
                                        <h6>Ventas</h6>
                                        {results.sales.slice(1).map((sale) => (
                                            <ListGroup.Item
                                                key={sale._id}
                                                action
                                                onClick={() => handleClick('sale', sale._id)}
                                            >
                                                {sale.fecha}
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                )}
                                {results.users.length > 0 && (
                                    <div>
                                        <h6>Usuarios</h6>
                                        {results.users.slice(1).map((user) => (
                                            <ListGroup.Item
                                                key={user._id}
                                                action
                                                onClick={() => handleClick('user', user._id)}
                                            >
                                                {user.username}
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                )}
                                {/* {results.reviews.length > 0 && (
                                    <div>
                                        <h6>Clientes</h6>
                                        {results.clients.slice(1).map((client) => (
                                            <ListGroup.Item
                                                key={client._id}
                                                action
                                                onClick={() => handleClick('client', client._id)}
                                            >
                                                {client.name}
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                )} */}
                            </ListGroup>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default GeneralFilter