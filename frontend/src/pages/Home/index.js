import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    Card,
    Container,
    EmptyListContainer,
    ErrorContainer,
    Header,
    InputSearchContainer,
    ListHeader,
    SearchNotFoundContainer,
} from "./styles";

import emptyBox from "../../assets/images/empty-box.svg";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import sad from "../../assets/images/icons/sad.svg";
import trash from "../../assets/images/icons/trash.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoadung] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const filteredContacts = useMemo(() => {
        return contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
            //(contact) => contact.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
        );
    }, [contacts, searchTerm]);

    const loadContents = useCallback(async () => {
        try {
            setIsLoadung(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
        } catch {
            setHasError(true);
        } finally {
            setIsLoadung(false);
        }
    }, [orderBy]);

    useEffect(() => {
        loadContents();
    }, [loadContents]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleTryAgain() {
        loadContents();
    }

    function handleDeleteContact(contact) {
        setContactBeingDeleted(contact);
        setIsDeleteModalVisible(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalVisible(false);
        setContactBeingDeleted(null);
    }

    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);

            await ContactsService.deleteContact(contactBeingDeleted.id);

            setContacts((prevState) =>
                prevState.filter(
                    (contact) => contact.id !== contactBeingDeleted.id,
                ),
            );

            handleCloseDeleteModal();

            toast({
                type: "success",
                text: "Contato deletado com sucesso!",
            });
        } catch {
            toast({
                type: "danger",
                text: "Ocorreu um erro ao deletar o contato.",
            });
        } finally {
            setIsLoadingDelete(false);
        }
    }

    return (
        <Container>
            <Loader isLoading={isLoading} />

            <Modal
                danger
                isLoading={isLoadingDelete}
                visible={isDeleteModalVisible}
                title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
                confirmLabel="Deletar"
                onCancel={handleCloseDeleteModal}
                onConfirm={handleConfirmDeleteContact}
            >
                <p>Esta ação não poderá ser desfeita!</p>
            </Modal>

            {contacts.length > 0 && (
                <InputSearchContainer>
                    <input
                        type="text"
                        values={searchTerm}
                        placeholder="Pesquise pelo nome ..."
                        onChange={handleChangeSearchTerm}
                    />
                </InputSearchContainer>
            )}

            <Header
                $justifyContent={
                    hasError
                        ? "flex-end"
                        : contacts.length > 0
                          ? "space-between"
                          : "center"
                }
            >
                {Boolean(!hasError && contacts.length > 0) && (
                    <strong>
                        {filteredContacts.length}
                        {filteredContacts.length === 1
                            ? " contato"
                            : " contatos"}
                    </strong>
                )}

                <Link to="/new">Novo Contato</Link>
            </Header>

            {hasError && (
                <ErrorContainer>
                    <img src={sad} alt="Sad" />
                    <div className="details">
                        <strong>
                            Ocorreu um erro ao obter os seus contatos!
                        </strong>
                        <Button type="button" onClick={handleTryAgain}>
                            Tentar Novamente
                        </Button>
                    </div>
                </ErrorContainer>
            )}

            {!hasError && (
                <>
                    {contacts.length < 1 && !isLoading && (
                        <EmptyListContainer>
                            <img src={emptyBox} alt="Empty Box" />
                            <p>
                                Você ainda não tem nenhum contato cadastrado!
                                Clique no botão <strong>”Novo contato”</strong>{" "}
                                à cima para cadastrar o seu primeiro!
                            </p>
                        </EmptyListContainer>
                    )}

                    {Boolean(contacts.length > 0 && filteredContacts < 1) && (
                        <SearchNotFoundContainer>
                            <img
                                src={magnifierQuestion}
                                alt="Magnifier Question"
                            />
                            <span>
                                Nenhum resultado foi encontrado para{" "}
                                <strong>"{searchTerm}"</strong>.
                            </span>
                        </SearchNotFoundContainer>
                    )}

                    {filteredContacts.length > 0 && (
                        <ListHeader $orderBy={orderBy}>
                            <button
                                type="button"
                                onClick={handleToggleOrderBy}
                                className="sort-button"
                            >
                                <span>Nome</span>
                                <img src={arrow} alt="Arrow" />
                            </button>
                        </ListHeader>
                    )}

                    {filteredContacts.map((contact) => (
                        <Card key={contact.id}>
                            <div className="info">
                                <div className="contact-name">
                                    <strong>{contact.name}</strong>
                                    {contact.category_name && (
                                        <small>{contact.category_name}</small>
                                    )}
                                </div>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                            </div>

                            <div className="actions">
                                <Link to={`/edit/${contact.id}`}>
                                    <img src={edit} alt="Edit" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteContact(contact)}
                                >
                                    <img src={trash} alt="Delete" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </>
            )}
        </Container>
    );
}
