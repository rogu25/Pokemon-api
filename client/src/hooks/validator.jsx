const validation = (input) => {
  let errors = {};
  if (tiene_numeros(input.nombre) === 1) {
    errors.nombre = 'No se permite numeros';
  } 
  else if (input.nombre.length < 4) {
    errors.nombre = 'Nombre minimo 4 letras';
  }

  if (tiene_letras(input.vida) === 1) {
    errors.vida = 'No se permite texto';
  }else if(Number(input.vida) < 10){
    errors.vida = 'Minimo 10';
  }else if(Number(input.vida) > 1000){
    errors.vida = 'Excedio el limite';
  }

  if (tiene_letras(input.fuerza) === 1) {
    errors.fuerza = 'No se permite texto';
  }else if(Number(input.fuerza) < 10){
    errors.fuerza = 'Minimo 10';
  }else if(Number(input.fuerza) > 1000){
    errors.fuerza = 'Excedio el limite';
  }
  
  if (tiene_letras(input.defensa) === 1) {
    errors.defensa = 'No se permite texto';
  }else if(Number(input.defensa) < 10){
    errors.defensa = 'Minimo 10';
  }else if(Number(input.defensa) > 1000){
    errors.defensa = 'Excedio el limite';
  }

  if (tiene_letras(input.velocidad) === 1) {
    errors.velocidad = 'No se permite texto';
  }else if(Number(input.velocidad) < 10){
    errors.velocidad = 'Minimo 10';
  }else if(Number(input.velocidad) > 1000){
    errors.velocidad = 'Excedio el limite';
  }

  if (tiene_letras(input.altura) === 1) {
    errors.altura = 'No se permite texto';
  }else if(Number(input.altura) < 10){
    errors.altura = 'Minimo 10';
  }else if(Number(input.altura) > 1000){
    errors.altura = 'Excedio el limite';
  }

  if (tiene_letras(input.peso) === 1) {
    errors.peso = 'No se permite texto';
  }else if(Number(input.peso) < 10){
    errors.peso = 'Minimo 10';
  }else if(Number(input.peso) > 1000){
    errors.peso = 'Excedio el limite';
  }

  if (!/(.jpg|.jpeg|.png|.gif)$/i.exec(input.imagen)) {
    errors.imagen = 'Img is required';
  }
  
  if (!input.tipos.length) {
    errors.tipos = 'Seleccione tipo de pokemon';
  }else if(input.tipos.length > 3){
    errors.tipos = "Maximo 3 tipos";
  }

  return errors;
}

// valida si un texto contiene numero
function tiene_numeros(texto){
  let numeros = "0123456789";
  for(let i=0; i<texto.length; i++){
     if (numeros.indexOf(texto.charAt(i),0)!==-1){
        return 1;
     }
  }
  return 0;
}

// valida si un numero contiene letras
function tiene_letras(texto){
  var letras="abcdefghyjklmnñopqrstuvwxyz";
  for(let i=0; i<texto.length; i++){
     if (letras.indexOf(texto.charAt(i),0)!==-1){
        return 1;
     }
  }
  return 0;
}

export default validation;