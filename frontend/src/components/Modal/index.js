import PropTypes from "prop-types";
import ReactDom from "react-dom";

import { Conatiner, Footer, Overlay } from "./styles";

import Button from "../Button";

export default function Modal({ danger }) {
    return ReactDom.createPortal(
        <Overlay>
            <Conatiner danger={danger}>
                <h1>Título do Modal</h1>
                <p>Corpo do Modal</p>

                <Footer>
                    <button type="button" className="cancel-button">
                        Cancelar
                    </button>
                    <Button type="button" danger={danger}>
                        Deletar
                    </Button>
                </Footer>
            </Conatiner>
        </Overlay>,
        document.getElementById("modal-root"),
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
};

Modal.defaultProps = {
    danger: false,
};
