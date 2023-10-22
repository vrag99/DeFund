import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        addProjects(first: 5) {
            id
            maker
            _project
        }
    }
`
export default GET_ACTIVE_ITEMS