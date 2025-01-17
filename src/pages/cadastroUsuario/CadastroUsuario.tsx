import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { cadastroUsuario } from "../../services/Service";
import Usuario from "../../models/Usuario";
import Footer from '../../components/statics/footer/Footer';
import NavbarPages from '../../components/statics/navbarPages/NavbarPages';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';
import useLocalStorage from "react-use-localstorage";

function CadastroUsuario() {

    let navigate = useNavigate();

    const [token, setToken] = useLocalStorage('token');
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: "",
            email: "",
            senha: "",
            telefone: "",
            endereco: "",
            cnpj: "",
            tipo: "ONG",
            foto:""
        }
    );

    const [usuarioResultado, setUsuarioResultado] = useState<Usuario>(
        {
            id: 1,
            nome: "",
            email: "",
            senha: "",
            telefone: "",
            endereco: "",
            cnpj: "",
            tipo: "ONG",
            foto: ""
        }
    );

    useEffect(() => {
        if (token !== '') {
            navigate('/doacoes')
        }
        
    }, [token])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha === usuario.senha)
        {
            await cadastroUsuario(`/api/Usuarios`, usuario, setUsuarioResultado)
            toast.success('Usuario cadastrado com sucesso', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
                navigate("/login");
        }
        else
        {
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
        }
    }

    return (
        <>  
            <NavbarPages />
            <div id='containerPrincipal-usuario'>
                <div id="img-box-usuario"> 
                    <img src="https://i.imgur.com/JeIA6aN.png" alt="logo" />
                </div>
                <div id="form-box-usuario">
                    <h1>Criar Conta</h1>
                    <p> Já é um membro? <a href="/login"> Login </a> </p>
                    <form onSubmit={onSubmit}>

                        <div className="input-group-usuario">
                            <label htmlFor="nome"> Nome da ONG </label>
                            <input value={usuario.nome} type="text" id="nome" name="nome" placeholder="Digite o nome da ONG" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            <div id="txtNome"></div>
                        </div>

                        <div className="input-group-usuario">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input value={usuario.cnpj} type="text" id="cnpj" name="cnpj" placeholder="Digite o CNPJ da sua empresa" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            <div id="txtCNPJ"></div>
                        </div>


                        <div className="input-group-usuario">
                            <label htmlFor="telefone"> Telefone</label>
                            <input value={usuario.telefone} type="text" id="telefone" name="telefone" placeholder="Digite o Telefone" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            <div id="txtTelefone"></div>
                        </div>

                        <div className="input-group-usuario">
                            <label htmlFor="email">E-mail</label>
                            <input value={usuario.email} type="email" id="email" name="email" placeholder="Digite o seu email" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            <div id="txtEmail"></div>
                        </div>


                        <div className="input-group-usuario">
                            <label htmlFor="endereco"> Endereço</label>
                            <input value={usuario.endereco} type="text" id="endereco" name="endereco" placeholder="Digite o Endereço" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            <div id="txtEndereco"></div>
                        </div>

                        <div className="input-group-usuario w50">
                            <label htmlFor="senha"> Senha</label>
                            <input value={usuario.senha} type="password" id="senha" name="senha" placeholder="Digite sua senha" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </div>

                        <div className="input-group-usuario w50">
                            <label htmlFor="confirmarSenha"> Confirmar Senha</label>
                            <input value={confirmarSenha} type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirme a senha" onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} />
                        </div>

                        <div className="input-group-usuario">
                            <label htmlFor="foto"> Foto</label>
                            <input value={usuario.foto} type="text" id="foto" name="foto" placeholder="Digite a URL da sua foto" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            <div id="foto"></div>
                        </div>
                        
                        <div className="input-group-usuario">
                            <button type="submit">Cadastrar</button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CadastroUsuario;