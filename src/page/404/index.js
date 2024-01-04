import { withRouter } from "react-router-dom"
import "./styles.less"

const IndexPage = ({ history }) => {
  return (
    <div className="p_not_found">
      <p>404</p>
    </div>
  )
}
export default withRouter(IndexPage)