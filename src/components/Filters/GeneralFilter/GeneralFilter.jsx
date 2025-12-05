import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import saleServices from '../../../services/sale.services';
import userServices from '../../../services/user.services';

const GeneralFilter = ({ onResultClick }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [highlightedResult, setHighlightedResult] = useState(null);

    const handleSearch = useCallback(async () => {
        setIsLoading(true);
        try {
            const [salesResponse, usersResponse] = await Promise.all([
                saleServices.filterSales({ client: searchValue, comercial: searchValue, zone: searchValue, business: searchValue }, { key: 'Fecha', direction: 'asc' }, 1, 10),
                userServices.filterUsers(searchValue)
            ]);

            const sales = salesResponse.data.sales.map(sale => ({ type: 'sale', data: sale }));
            const users = usersResponse.data.users.map(user => ({ type: 'user', data: user }));

            const combinedResults = [...sales, ...users];
            setResults(combinedResults);

            if (combinedResults.length > 0) {
                setHighlightedResult(combinedResults[0]);
            } else {
                setHighlightedResult(null);
            }
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchValue]);

    useEffect(() => {
        if (searchValue) {
            handleSearch();
        } else {
            setResults([]);
            setHighlightedResult(null);
        }
    }, [searchValue, handleSearch]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClick = (type, id) => {
        onResultClick(type, id);
    };

    return (
        <div className="GeneralFilter">
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
                                onClick={() => handleClick(highlightedResult.type, highlightedResult.data._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {highlightedResult.type === 'sale' && (
                                    <div>
                                        <h6>{highlightedResult.data.Fecha}</h6>
                                        <p>{highlightedResult.data.Importe}</p>
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
                                        <p>{highlightedResult.data.email}</p>
                                    </div>
                                )}
                            </div>
                        </Col>
                    )}
                    <Col md={6}>
                        <h5>Resultados</h5>
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="result-item"
                                onClick={() => handleClick(result.type, result.data._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {result.type === 'sale' && (
                                    <div>
                                        <h6>{result.data.Fecha}</h6>
                                        <p>{result.data.Importe}</p>
                                    </div>
                                )}
                                {result.type === 'user' && (
                                    <div>
                                        <img
                                            src={result.data.avatar || 'default-avatar.png'}
                                            alt={result.data.username}
                                            width="100%"
                                            className="mb-2"
                                        />
                                        <h6>{result.data.username}</h6>
                                        <p>{result.data.email}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Col>
                </Row>
            )}
        </div>
    )
}

GeneralFilter.propTypes = {
    onResultClick: PropTypes.func.isRequired,
}

export default GeneralFilter