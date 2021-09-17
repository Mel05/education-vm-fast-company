import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../API"
import Pagination from "./pagination"
import TableTitle from "./tableTitle"
import TableUsers from "./tableUsers"
import GroupList from "./groupList"

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const pageSize = 8

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    user.bookmark = !user.bookmark
                }

                return user
            })
        )
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users
        const count = filteredUsers.length
        const pageCount = Math.ceil(count / pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Отчистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <TableTitle count={count} />
                    {!!count && (
                        <TableUsers
                            filteredUsers={filteredUsers}
                            currentPage={pageCount === 1 ? 1 : currentPage}
                            pageSize={pageSize}
                            handleDelete={handleDelete}
                            handleToggleBookMark={handleToggleBookMark}
                        />
                    )}

                    {pageCount > 1 && (
                        <div className="d-flex justify-content-center">
                            <Pagination
                                pageCount={pageCount}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return "loading..."
}
Users.propTypes = {
    users: PropTypes.array,
    handleDelete: PropTypes.func,
    handleToggleBookMark: PropTypes.func
}

export default Users
