import ProfileUserCard from '../ProfileUserCard/ProfileUserCard'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

const ProfileUserList = ({ users }) => {

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

ProfileUserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string,
            role: PropTypes.string,
            email: PropTypes.string,
        })
    ).isRequired,
}

export default ProfileUserList