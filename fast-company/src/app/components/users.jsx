import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import api from "../api"
import UserTable from "./usersTable"
import SearchStatus from "./searchStatus"
import PropTypes from "prop-types"

const Users = ({ users, ...rest }) => {
    const pageSize = 2
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => setCurrentPage(1), [selectedProf])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }
    let filteredUsers = null
    if (selectedProf) {
        filteredUsers = users.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
    } else filteredUsers = users
    const count = filteredUsers.length

    const startIndex = (currentPage - 1) * pageSize
    if (startIndex >= filteredUsers.length) {
        setCurrentPage(currentPage - 1)
    }
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

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
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && <UserTable users={userCrop} {...rest} />}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users