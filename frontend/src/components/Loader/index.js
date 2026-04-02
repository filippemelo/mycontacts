import PropTypes from "prop-types";
import ReactDom from "react-dom";

import Spinner from "../Spinner";
import { Overlay } from "./styles";

// loader-root
export default function Loader({ isLoading }) {
    if (!isLoading) {
        return null;
    }
    return ReactDom.createPortal(
        <Overlay>
            <Spinner size={90} />
        </Overlay>,
        document.getElementById("loader-root"),
    );
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
