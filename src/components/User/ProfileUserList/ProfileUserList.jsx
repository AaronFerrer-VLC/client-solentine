import ProfileUserCard from '../ProfileUserCard/ProfileUserCard'
import { Row, Col } from 'react-bootstrap'

const ProfileUserList = ({ users, oneUserClick }) => {

    return (
        <div className="ReviewsList">
            <Row className="d-flex justify-content-center">
                {
                    users.map(elm => {
                        return (
                            <Col key={elm._id} lg={{ span: 3 }} className="reviews-container">
                                <ProfileUserCard {...elm}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default ProfileUserList