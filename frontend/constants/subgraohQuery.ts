import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        addProjects(first: 1) {
            id
            maker
            _project
        }
    }
`
export default GET_ACTIVE_ITEMS