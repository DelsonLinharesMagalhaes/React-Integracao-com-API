import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../service";
import { CATEGORIAS } from "../constants";
import { useEffect } from "react";

// // subistitui por chamadas a API
// const estudios = [
//   {
//     id: 1,
//     nome: "Nintendo",
//     endereco: "Rua X",
//     dataCriacao: "2023-09-28T06:37:36.772Z"
//   },
// ];

export default function FormJogo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogo, setJogo] = useState({});

  const [estudios,setEstudios] = useState([]) 
  useEffect(() => {
    apiClient.get("/Estudios")
    .then(response => setEstudios(response.data))
    .catch(erro => console.log(erro))
  }, [])

  const handleAddJogo = async (e) => {
    e.preventDefault();

    const data = {
      ...jogo,
      categoria: Number(jogo.categoria)
    }

    apiClient.post("/Jogos", data)
      .then(() => navigate("/"))
      .catch((erro) => console.error(erro));

  };

  const handleEditJogo = async (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <button onClick={() => navigate("/")}>&lt; Voltar</button>
      <br />
      <br />

      <h2>{id ? "Editar" : "Adicionar"} Jogo</h2>
      <form onSubmit={id ? handleEditJogo : handleAddJogo}>

        <label htmlFor="estudio">Estúdio</label>
        <br />
        <select
          required
          onChange={(e) => {
            setJogo({ ...jogo, estudioId: e.target.value });
          }}
          value={jogo.estudioId || ""}
        >
          <option
            value=""
            style={{
              display: "none",
            }}
          >
            Escolha um estúdio
          </option>
          {estudios.map((estudio, index) => {
            return (
            <option
              value={estudio.id}
              key={index}
            >
              {estudio.nome}
            </option>
          )})}
        </select>
        <br />
        <br />

        <label htmlFor="nome">Nome</label>
        <br />
        <input
          required
          type="text"
          placeholder="Nome do jogo"
          value={jogo.nome}
          onChange={(e) => {
            setJogo({ ...jogo, nome: e.target.value });
          }}
        />
        <br />
        <br />

        <label htmlFor="dataLancamento">Data de lançamento</label>
        <br />
        <input
          type="date"
          value={jogo.dataLancamento ? jogo.dataLancamento.split("T")[0] : ""}
          onChange={(e) => {
            const data = new Date(e.target.value).toISOString();
            setJogo({ ...jogo, dataLancamento: data });
          }}
        />
        <br />
        <br />

        <label htmlFor="categoria">Categoria</label>
        <br />
        <select
          onChange={(e) => {
            setJogo({ ...jogo, categoria: e.target.value });
          }}
          value={jogo.categoria || ""}
        >
          <option value="" style={{ display: "none" }}>
            Escolha uma categoria
          </option>
          {CATEGORIAS.map((categoria, index) => (
            <option value={categoria.id} key={index}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button type="submit">{id ? "Editar" : "Adicionar"}</button>
      </form>
    </div>
  );
}