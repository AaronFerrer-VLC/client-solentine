import { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import saleServices from "../../../services/sale.services"
import Loader from "../../Loader/Loader"

const EditSaleForm = ({ sale, onSaleSaved }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        Día: "",
        Mes: "",
        Año: "",
        Fecha: "",
        Negocio: "",
        Zona: "",
        Marca: "",
        Cliente: "",
        Importe: "",
        Comercial: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (sale) {
            setFormData({
                Día: sale.Día || "",
                Mes: sale.Mes || "",
                Año: sale.Año || "",
                Fecha: sale.Fecha || "",
                Negocio: sale.Negocio || "",
                Zona: sale.Zona || "",
                Marca: sale.Marca || "",
                Cliente: sale.Cliente || "",
                Importe: sale.Importe || "",
                Comercial: sale.Comercial || "",
            })
        }
    }, [sale])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!sale) {
            setError("No se proporcionó información de la venta.")
            return
        }

        try {
            setIsSubmitting(true)
            const response = await saleServices.editSale(sale._id, formData)
            setSuccess("Venta actualizada con éxito")
            setError("")
            onSaleSaved()
        } catch (err) {
            setError("Hubo un error al actualizar la venta.")
            setSuccess("")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        isLoading ? <Loader /> :
            <div>
                <h2>Editar Venta</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Día">
                        <Form.Label>Día</Form.Label>
                        <Form.Control
                            type="number"
                            name="Día"
                            value={formData.Día || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Mes">
                        <Form.Label>Mes</Form.Label>
                        <Form.Control
                            type="number"
                            name="Mes"
                            value={formData.Mes || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Año">
                        <Form.Label>Año</Form.Label>
                        <Form.Control
                            type="number"
                            name="Año"
                            value={formData.Año || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="Fecha"
                            value={formData.Fecha || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Negocio">
                        <Form.Label>Negocio</Form.Label>
                        <Form.Control
                            type="text"
                            name="Negocio"
                            value={formData.Negocio || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Zona">
                        <Form.Label>Zona</Form.Label>
                        <Form.Control
                            type="text"
                            name="Zona"
                            value={formData.Zona || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Marca">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            name="Marca"
                            value={formData.Marca || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Cliente">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="Cliente"
                            value={formData.Cliente || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Importe">
                        <Form.Label>Importe</Form.Label>
                        <Form.Control
                            type="number"
                            name="Importe"
                            value={formData.Importe || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Comercial">
                        <Form.Label>Comercial</Form.Label>
                        <Form.Control
                            type="text"
                            name="Comercial"
                            value={formData.Comercial || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3" disabled={isSubmitting}>
                        {isSubmitting ? "Actualizando..." : "Actualizar Venta"}
                    </Button>
                </Form>
            </div>
    )
}

export default EditSaleForm