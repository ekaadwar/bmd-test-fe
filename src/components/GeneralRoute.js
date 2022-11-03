import { connect } from "react-redux";

const PrivateRoute = ({ element }) => {
  return element;
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
