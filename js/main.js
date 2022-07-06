const Clickbutton= document.querySelectorAll("button")
const tbody= document.querySelector(".tbody")
let carrito= []
const botonPagar= document.querySelector("#pagar")
botonPagar.addEventListener("click",()=>{
  Swal.fire({
    title: 'PEDIDO CONFIRMADO, LO ENVIAREMOS PRONTO, ¡GRACIAS POR TU COMPRA!.',
    width: 600,
    padding: '3em',
    color: '#4f494b',
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
    rgba(218, 156, 248, 0.8)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `
  })
})

Clickbutton.forEach(btn=> {
    btn.addEventListener("click",addToCarritoItem)
})


function addToCarritoItem(e){
    const button= e.target
    const item = button.closest(".card")
    const itemTitle= item.querySelector(".card-title").textContent;
    const itemPrice= item.querySelector(".precio").textContent;
    const itemImg= item.querySelector(".card-img-top").src;
    
    const newItem={
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }
    
    addItemCarrito(newItem)
}


function addItemCarrito(newItem){
    const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')
    
    const InputElmento= tbody.getElementsByClassName('input__elemento')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
          
          carrito[i].cantidad ++;
          const inputValue = InputElmento[i]
          inputValue.value++;
          CarritoTotal()
            return null;
        }
    }  
        
    
    carrito.push(newItem)
    renderCarrito()
}
function renderCarrito(){
    tbody.innerHTML=""
    carrito.map(item =>{
        const tr= document.createElement("tr")
        tr.classList.add("ItemCarrito")
        const Content=`
        <th scope="row">1</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title text-white">${item.title}</h6>
        </td>
        <td class="table__precio text-white"><p>${item.precio}</p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class='input__elemento'>
            <button class="delete btn btn-danger">x</button>
        </td>
        
        
        `
    tr.innerHTML= Content;
    tbody.append(tr)
    
    tr.querySelector(".delete").addEventListener("click", removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
   
    })
   CarritoTotal() 
}

function CarritoTotal(){
    let Total= 0;
    const itemCartTotal= document.querySelector(".itemCartTotal")
    carrito.forEach((item)=>{
        const precio= Number(item.precio.replace("$",''))
        Total = Total + precio*item.cantidad
    })
    
    itemCartTotal.innerHTML=`Total $${Total}`
    addSessionStorage()
  
    }
    function removeItemCarrito(e){
        const buttonDelete = e.target
        const tr = buttonDelete.closest(".ItemCarrito")
        const title = tr.querySelector('.title').textContent;
        for(let i=0; i<carrito.length ; i++){
      
          if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
          }
        }


        tr.remove()
        CarritoTotal()

    }
    function sumaCantidad(e){
      const sumaInput  = e.target
      const tr = sumaInput.closest(".ItemCarrito")
      const title = tr.querySelector('.title').textContent;
      carrito.forEach(item => {
        if(item.title.trim() === title){
          sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
          item.cantidad = sumaInput.value;
          CarritoTotal()
          
        }
      })
      
    }

        function addSessionStorage(){
            sessionStorage.setItem('carrito', JSON.stringify(carrito))
          }
          
          window.onload = function(){
            const storage = JSON.parse(sessionStorage.getItem('carrito'));
            if(storage){
              carrito = storage;
              renderCarrito()
            }
    }
  
  