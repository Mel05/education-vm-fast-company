import React from "react"
import PropTypes from "prop-types"
import { displayDate } from "../../../utils/displayDate"
import { useUser } from "../../../hooks/useUsers"
import { useAuth } from "../../../hooks/useAuth"

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    deleteComment
}) => {
    const { getUserById } = useUser()
    const user = getUserById(userId)
    const { currentUser } = useAuth()

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.name}
                                        <span className="small">
                                            - {displayDate(created)}
                                        </span>
                                    </p>
                                    {currentUser._id === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => deleteComment(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    _id: PropTypes.string,
    userId: PropTypes.string,
    deleteComment: PropTypes.func
}

export default Comment