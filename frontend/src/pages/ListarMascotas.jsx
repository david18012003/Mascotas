import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ListarMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const obtenerMascotas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pet/listar",{ headers: { token: token } });
        setMascotas(response.data.pets);
        console.log(response.data.pets);
        console.log(token);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      }
    };
  useEffect(() => {
    

    obtenerMascotas();
  }, []);

  const EliminarMascota = async(id)=>{
    const url = `http://localhost:3000/pet/eliminar/${id}`
    try {
      const resultado = await axios.delete(url,{headers:{token:token}})
      if (resultado.status === 200) {
        alert('Mascota eliminada exitosamente ')
        console.log('mascota eliminada correctamente ',id );
        obtenerMascotas()
      } else {
        alert('No se pudo eliminar la mascota ')
      }
    } catch (error) {
      console.error('Error al eliminar las mascotas ',error.message)
    }
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundImage: "url('/bg.svg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "330px",
            padding: "20px",
            color: "#fff",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 40 }}>Administrar Mascotas</h1>
          <img style={{width:25,height:25}} onClick={()=>navigate('/')} src="/btn-close.svg" alt="" />
        </div>
        <div onClick={()=>navigate("/registrar")}
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "330px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <img src="btn-add.svg" alt="" />
        </div>

        <div
          style={{
            position: "absolute",
            top: "60%", // Ajusta la posición del scroll vertical
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "70vh", // Establece la altura máxima del área de scroll
            overflowY: "auto", // Añade el scroll vertical si el contenido excede la altura máxima
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                width: 1px; // Ancho del scrollbar
              }

              ::-webkit-scrollbar-track {
                background-color: transparent; // Color de fondo del scrollbar
              }

              ::-webkit-scrollbar-thumb {
                background-color: rgba(44, 70, 116, 1); // Color de la barra de desplazamiento
                border-radius: 5px; // Radio de borde de la barra de desplazamiento
              }
            `}
          </style>
          {mascotas.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 opacity-75 rounded-lg h-31 flex items-center space-x-3 mb-2"
            >
              <img
                style={{ width: 60, height: 60 }}
                alt={item.photo}
                src={`http://localhost:3000/img/${item.photo}`}
              />
              <div>
                <h2 style={{ fontSize: 20 }} className="font-semibold">
                  {item.nombre}
                </h2>
                <h2 style={{ fontSize: 15 }} className="font-medium">
                  {item.race_name}
                </h2>
              </div>
              <img
                style={{ width: 30, height: 30 }}
                src="/btn-delete.svg"
                alt=""
                onClick={()=>EliminarMascota(item.id)}
              />
              <img
                style={{ width: 30, height: 30 }}
                src="/btn-edit.svg"
                alt=""
                onClick={()=>navigate(`/editar/${item.id}`)}
              />
              <img
                style={{ width: 30, height: 30, margin: 10 }}
                src="/btn-show.svg"
                alt=""
                onClick={()=>navigate(`/buscar/${item.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListarMascotas;
