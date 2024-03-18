let elAddStudent = document.querySelector(".add-student")
let tBody = document.querySelector(".tbody")


let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let elSearchInput = document.querySelector(".search-input")
let elSearchList = document.querySelector(".search-list")

let students =JSON.parse(window.localStorage.getItem("students")) || []


elAddStudent.addEventListener("click", function(){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML=`
        <form class="add-form">
            <label>
                <div class="w-[80%]   mx-auto  bg-white">
                    <img class=" h-[250px] render-img" src="./img/choose-img.png" alt="" width="100%" height="100%"/>
                </div>
                <input class="choose-input visually-hidden" type="file"/>
            </label>
            <div class="p-3 bg-white mt-5 flex justify-between">
                <div class="w-[49%] flex flex-col gap-5 ">
                   <label class="flex flex-col">
                       <span>Enter students name</span>
                       <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter students name"/>
                   </label>
                   <label class="flex flex-col">
                       <span>Enter students email</span>
                       <input class="p-2 border-[1px] border-black rounded-md" type="email" placeholder="Enter students email"/>
                    </label>
                    <label class="flex flex-col">
                       <span>Enter students phone</span>
                       <input class="p-2 border-[1px] border-black rounded-md" type="phone" placeholder="Enter students phone"/>
                   </label>
                </div>
                <div class="w-[49%] flex flex-col gap-5 ">
                <label class="flex flex-col">
                    <span>Enter Enroll Number</span>
                    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter enroll number"/>
                </label>
                <label class="flex flex-col">
                    <span>Enter Date admission</span>
                    <input class="p-2 border-[1px] border-black rounded-md" type="date" placeholder="Enter date admission"/>
                 </label>
             </div>
            </div>
            <button class="bg-teal-500 p-2 rounded-md font-bold text-white w-[200px] block mx-auto my-2">Add</button>
        </form>
    `
    let elForm = document.querySelector(".add-form")
    let elInputChoose = document.querySelector(".choose-input")
    let elRenderImg = document.querySelector(".render-img")

    elInputChoose.addEventListener("change", function(evt){
         elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
    })


    elForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        let data ={
            id:students.length,
            img:URL.createObjectURL(evt.target[0].files[0]),
            name:evt.target[1].value,
            email:evt.target[2].value,
            phone:evt.target[3].value,
            enrollNumber:evt.target[4].value,
            dateAdmission:evt.target[5].value


        }
        students.push(data)
        renderStudents(students,tBody)
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("students", JSON.stringify(students))
    })
})

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})

function renderStudents(arr, list){
    list.innerHTML=""
    arr.map(item => {
        let elTr =document.createElement("tr")
        elTr.innerHTML=`
            <tr class="rounded-md">
               <td class="text-center p-1 bg-white ">
                   <img class="rounded-md" src="${item.img}" alt="Render img" width="60" height="40"/>
               </td>
               <td class="text-center p-1 bg-white">
                   <strong>${item.name}</strong>
               </td>
               <td class="text-center p-1 bg-white">${item.email}</td>
               <td class="text-center p-1 bg-white">${item.phone}</td>
               <td class="text-center p-1 bg-white">${item.enrollNumber}</td>
               <td class="text-center p-1 bg-white">${item.dateAdmission}</td>
               <td class="text-center p-1  bg-white">
                  <button onclick="updateStudent(${item.id})" class="pr-3">
                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M18.3033 2.08777L16.9113 0.695801C16.4478 0.231934 15.8399 0 15.2321 0C14.6242 0 14.0164 0.231934 13.5525 0.69543L0.475916 13.772L0.00462689 18.0107C-0.0547481 18.5443 0.365701 19 0.88783 19C0.920858 19 0.953885 18.9981 0.987654 18.9944L5.22332 18.5265L18.3036 5.44617C19.231 4.51881 19.231 3.01514 18.3033 2.08777ZM4.67818 17.3924L1.2259 17.775L1.61035 14.3175L11.4031 4.52475L14.4747 7.59629L4.67818 17.3924ZM17.4639 4.60676L15.3141 6.7565L12.2426 3.68496L14.3923 1.53521C14.6164 1.31107 14.9148 1.1875 15.2321 1.1875C15.5494 1.1875 15.8474 1.31107 16.0719 1.53521L17.4639 2.92719C17.9266 3.39031 17.9266 4.14363 17.4639 4.60676Z" fill="#FEAF00"/>
                     </svg>
                  </button>
                   <button onclick = "deleteStudent(${item.id})">
                     <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.285713 2.25H4L5.2 0.675C5.35968 0.465419 5.56674 0.295313 5.80478 0.178154C6.04281 0.0609948 6.30529 0 6.57143 0L9.42857 0C9.69471 0 9.95718 0.0609948 10.1952 0.178154C10.4333 0.295313 10.6403 0.465419 10.8 0.675L12 2.25H15.7143C15.7901 2.25 15.8627 2.27963 15.9163 2.33238C15.9699 2.38512 16 2.45666 16 2.53125V3.09375C16 3.16834 15.9699 3.23988 15.9163 3.29262C15.8627 3.34537 15.7901 3.375 15.7143 3.375H15.0393L13.8536 16.4637C13.8152 16.8833 13.6188 17.2737 13.3029 17.558C12.987 17.8423 12.5745 17.9999 12.1464 18H3.85357C3.42554 17.9999 3.01302 17.8423 2.69711 17.558C2.38121 17.2737 2.18477 16.8833 2.14643 16.4637L0.960713 3.375H0.285713C0.209937 3.375 0.137264 3.34537 0.083683 3.29262C0.0301008 3.23988 0 3.16834 0 3.09375V2.53125C0 2.45666 0.0301008 2.38512 0.083683 2.33238C0.137264 2.27963 0.209937 2.25 0.285713 2.25ZM9.88571 1.35C9.8323 1.28034 9.76324 1.22379 9.68393 1.18475C9.60463 1.14572 9.51723 1.12527 9.42857 1.125H6.57143C6.48277 1.12527 6.39537 1.14572 6.31606 1.18475C6.23676 1.22379 6.1677 1.28034 6.11429 1.35L5.42857 2.25H10.5714L9.88571 1.35ZM3.28571 16.3617C3.29748 16.5019 3.36245 16.6325 3.46768 16.7277C3.57292 16.8228 3.7107 16.8754 3.85357 16.875H12.1464C12.2893 16.8754 12.4271 16.8228 12.5323 16.7277C12.6376 16.6325 12.7025 16.5019 12.7143 16.3617L13.8929 3.375H2.10714L3.28571 16.3617Z" fill="#FEAF00"/>
                     </svg>
                   </button>
               </td>
            </tr>
        `
        list.appendChild(elTr)
    })
}
renderStudents(students,tBody)

function updateStudent(id){
    let data = students.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML=`
    <form class="update-form">
        <label>
            <div class="w-[80%]   mx-auto  bg-white">
                <img class=" h-[250px] update-img" src=${data.img} alt="" width="100%" height="100%"/>
            </div>
            <input class="update-input visually-hidden" type="file"/>
        </label>
        <div class="p-3 bg-white mt-5 flex justify-between">
            <div class="w-[49%] flex flex-col gap-5 ">
               <label class="flex flex-col">
                   <span>Enter students name</span>
                   <input value=${data.name} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter students name"/>
               </label>
               <label class="flex flex-col">
                   <span>Enter students email</span>
                   <input value=${data.email} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter students email"/>
                </label>
                <label class="flex flex-col">
                   <span>Enter students phone</span>
                   <input value=${data.phone} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter students phone"/>
               </label>
            </div>
            <div class="w-[49%] flex flex-col gap-5 ">
            <label class="flex flex-col">
                <span>Enter Enroll Number</span>
                <input value=${data.enrollNumber} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter enroll number"/>
            </label>
            <label class="flex flex-col">
                <span>Enter Date admission</span>
                <input value=${data.dateAdmission} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter date admission"/>
             </label>
         </div>
        </div>
        <button class="bg-teal-500 p-2 rounded-md font-bold text-white w-[200px] block mx-auto my-2">Add</button>
    </form>
`

let elUpdateForm =document.querySelector(".update-form")
let elUpdateImgInput = document.querySelector(".update-input")
let elUpdateImg = document.querySelector(".update-img")


elUpdateImgInput.addEventListener("change", function(evt){
    elUpdateImg.src = URL.createObjectURL(evt.target.files[0])
})

elUpdateForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    data.img = elUpdateImg.src
    data.name =evt.target[1].value
    data.email =evt.target[2].value
    data.phone =evt.target[3].value
    data.enrollNumber =evt.target[4].value
    data.dateAdmission =evt.target[5].value
    
    renderStudents(students,tBody)
    elModalWrapper.classList.remove("open-modal")
    window.localStorage.setItem("students", JSON.stringify(students))
})

}


function deleteStudent(id){
    let fIndex = students.findIndex(item=> item.id == id)
    let confirmDelete = confirm()
    if(confirmDelete){
        students.splice(fIndex,1)
        renderStudents(students, tBody)
        window.localStorage.setItem("students", JSON.stringify(students))

    }
    else{
        students.splice(fIndex,0) 
    }
    
}

elSearchInput.addEventListener("keyup", function(){
    let data = students.filter(item => item.name.toLowerCase().include(evt.target.value.toLowerCase()))
    if(evt.target.value){
        elSearchList.classList.add("open-list")
    }
    else{
        elSearchList.classList.remove("open-list") 
    }
}) 


