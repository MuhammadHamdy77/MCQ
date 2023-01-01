window.onload = function () { 
    let isAdmin =   document.querySelector(".is-admin");
    let loadder =   document.querySelector('.spinner-groww');
    if(isAdmin){
        var allLinks = isAdmin.querySelectorAll('.form-group');
            allLinks.forEach(element => {
                element.addEventListener('click' , function () { 
                    allLinks.forEach(el=>{
                        el.classList.remove("active")
                    })
                    element.classList.add("active")
                })
            });
 }

 setTimeout(() => {
    loadder.style.display = 'none'
 }, 2000);
}
