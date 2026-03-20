import { Link } from "react-router-dom";

import {
    Card,
    Container,
    Header,
    InputSearchContainer,
    ListerContainer,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";


export default function Home() {
    return (
        <Container>
            {/* <Loader /> */}
            {/* <Modal danger /> */}

            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome ..." />
            </InputSearchContainer>

            <Header>
                <strong>3 contatos</strong>
                <Link to="/new">Novo Contato</Link>
            </Header>

            <ListerContainer>
                <header>
                    <button type="button" className="sort-button">
                        <span>Nome</span>
                        <img src={arrow} alt="Arrow" />
                    </button>
                </header>
            </ListerContainer>

            <Card>
                <div className="info">
                    <div className="contact-name">
                        <strong>Mateus Silva</strong>
                        <small>instagram</small>
                    </div>
                    <spam>mateus.teste@email.com</spam>
                    <spam>(91) 98899-9988</spam>
                </div>

                <div className="actions">
                    <Link to="/edit/123">
                        <img src={edit} alt="Edit" />
                    </Link>
                    <button>
                        <img src={trash} alt="Delete" />
                    </button>
                </div>
            </Card>
        </Container>
    );
}
