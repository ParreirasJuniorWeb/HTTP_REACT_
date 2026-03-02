import { useState } from 'react';
import { useFetch } from "./hooks/useFetch";

// import CSS
import './App.css'

function App() {

  // 1 - Resgatando dados
  const [products, setProducts] = useState([]);

  // UseEffect para gerenciar/controlar os estados da 
  // minha requisição e dados externos à minha aplicação.

  // 2 - Trazer os dados/ Obtendo os dados de um 
  // servidor/arquivos externos

  const urlBase = "http://localhost:3000/products";

  // 4 - Custom Hook

  const { data: items, httpConfig, loading, error } = useFetch(urlBase);

  // useEffect(() => {

  //   async function getData () {
      
  //     const response = await fetch(urlBase);

  //     const data = await response.json();

  //     setProducts(data);
  //   }

  //   getData();

  // }, []);
  
  // 2 - Envio de dados

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async(e) => {

    e.preventDefault();

    // 5 - refatorando o post

    const product = {
      name: name,
      price: price,
    }

    httpConfig(product, "POST");

    // const response = await fetch(urlBase, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product),
    // });

    // // 3 - Carregamento de dados dinâmico

    // const addedProduct = await response.json();

    // setProducts((prevProducts) => [...prevProducts], addedProduct);

  };

  return (
    <>
      <div className='App-container'>
        <h1>HTTP em React</h1>
        {/* 6 - loading */}

        {loading && <p>Carregando...</p>}
        
        {/* 7 - TRATAMENTO DE ERROS NA APLICAÇÃO REACT */}

        {error && <p>{error}</p>}

        {/* 1 - Resgate de dados */}
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - {product.price}</li>
          ))}
        </ul>
        {/* 2 - Enviando dados */}
        <div className="add-product">
          <form
            onSubmit={handleSubmit}
          >
            <label htmlFor="">
              <span>Nome</span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="">
              <span>Preço (R$)</span>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            {/* <input type="submit" value="Enviar" /> */}
            {/* 7 - loading post */}
            {loading 
            ? <input type="submit" value="Aguarde..." disabled /> 
            : <input type="submit" value="Enviar" />}
          </form>
        </div>
      </div>
    </>
  )
}

export default App
