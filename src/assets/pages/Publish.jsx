import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import React from 'react'
// import Dropzone from 'react-dropzone'

function Publish ({userToken , setUserToken}) {

    useEffect(() => {
        const tokenCookies = Cookies.get("token");
        setUserToken(tokenCookies);
      }, []);

    const [file, setFile] = useState({})   
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [marque, setMarque] = useState("")
    const [taille, setTaille] = useState("")
    const [couleur, setCouleur] = useState("")
    const [etat, setEtat] = useState("")
    const [lieu, setLieu] = useState("")
    const [prix, setPrix] = useState("")
    const token = userToken
// console.log(token);
    return (
        <div className="publish">
            <p>Vends ton article</p>
            <form onSubmit={async e => {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append("picture", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", marque);
            formData.append("size", taille);
            formData.append("color", couleur);
            formData.append("condition", etat);
            formData.append("city", lieu);
            formData.append("price", prix);

            console.log("FormData contents:");
            for (let pair of formData.entries()) {
              console.log(pair[0], pair[1]);
            }


            try {
                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                  formData,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "multipart/form-data"
                    }
                  }
                );
  
                alert(JSON.stringify(response.data));
              } catch (err) {
                if (err.response.status === 500) {
                  console.error("An error occurred");
                } else {
                  console.error(err.response.data);
                }
              }
        }}
            
            
            >
            <div className="publishImg">
            {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
            <section>
            <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            </section>
            )}
            </Dropzone> */}
                <input type="file" onChange={event => {
              setFile(event.target.files[0]);
            }}/>
            </div>
            <div className="publishTitle">
                <div>
                <label htmlFor="titre">TITRE</label>
                <label htmlFor="description">DESCRIPTION</label>
                </div>
                <div>
                <input type="text" placeholder="titre" id="titre" value = {title} onChange= {event => {
                    setTitle(event.target.value)
                }}/>
                <textarea rows="4" cols="50" placeholder="description" value = {description} onChange={event => {
                    setDescription(event.target.value)
                }}> </textarea>                
                </div>
            </div>
            <div className="publishDetail">
                <input type="text" placeholder="marque" value = {marque} onChange={event => {
                    setMarque(event.target.value)
                }}/>
                <input type="text" placeholder="taille" value = {taille} onChange={event => {
                    setTaille(event.target.value)
                }}/>
                <input type="text" placeholder="couleur" value = {couleur} onChange={event => {
                    setCouleur(event.target.value)
                }}/>
                <input type="text" placeholder="etat" value = {etat} onChange={event => {
                    setEtat(event.target.value)
                }}/>
                <input type="text" placeholder="lieu" value = {lieu} onChange={event => {
                    setLieu(event.target.value)
                }}/>
            </div>
            <div className="publishPrice">
                <input type="text" placeholder="prix" value = {prix} onChange={event => {
                    setPrix(event.target.value)
                }}/>
                <input type="checkbox" />
            </div>
            <button>Ajouter</button>
            </form>
        </div>
    )
}

export default Publish