import { AddNewUser } from "./adminModule/functionality/AddNewUser.js";
import { PromoteToSeller } from "./adminModule/functionality/PromoteToSeller.js";
import { DemoteSeller } from "./adminModule/functionality/DemoteSeller.js";
import { AddingNewAdmin } from "./adminModule/functionality/AddingNewAdmin.js";
import { AddingNewShop } from "./adminModule/functionality/AddingNewShop.js";
import { DeleteShop } from "./adminModule/functionality/DeleteShop.js";
import { ListOfShops } from "./adminModule/functionality/listOfShops.js";
import { ResignationLetter } from "./sellerModule/functionality/resignationLetter.js";
import { JobApplicationSeller } from "./buyerModule/jobApplicationSeller.js";
import { WriteReview } from "./buyerModule/WriteReview.js";
import { WriteComment } from "./buyerModule/writeComment.js";
import { ListOfApplication } from "./adminModule/functionality/ListOfApplication.js";


export async function fillPersonalAccount(user, LoggedIn){
    let lol = document.getElementById('Lol');
    document.getElementById('Name').innerHTML = `${user.name}(${user.login})`;
    let Role = user.role;
    console.log(Role)
    if(Role == 0){
        document.getElementById('Role').innerHTML = "Статус: Админ";

        let functional = document.getElementById('Functional');
        let addNewUser = document.createElement('button');
		addNewUser.innerText = 'Добавить пользователя'
        addNewUser.setAttribute('id', 'FunctionalBtns');
        addNewUser.addEventListener("click", ()=>{
            let addNewUserWindow = document.getElementById('addNewUser')
            addNewUserWindow.style.display = "flex"
            AddNewUser(LoggedIn)
        })
        // let promoteToSeller = document.createElement('button');
		// promoteToSeller.innerText = 'Назначить продавца';
        // promoteToSeller.setAttribute('id', 'FunctionalBtns');
        // promoteToSeller.addEventListener("click", ()=>{
        //     let promoteToSellerWindow = document.getElementById('PromotionToSeller');
        //     promoteToSellerWindow.style.display = "flex";
        //     PromoteToSeller(LoggedIn);
        // })
        // let demoteSeller = document.createElement('button');
		// demoteSeller.innerText = 'Уволить продавца';
        // demoteSeller.setAttribute('id', 'FunctionalBtns');
        // demoteSeller.addEventListener("click", ()=>{
        //     let demoteSellerWindow = document.getElementById('DemoteSeller');
        //     demoteSellerWindow.style.display = "flex";
        //     DemoteSeller(LoggedIn)
        // })
        let promoteToAdmin = document.createElement('button');
		promoteToAdmin.innerText = 'Назначить админа';
        promoteToAdmin.setAttribute('id', 'FunctionalBtns');   
        promoteToAdmin.addEventListener("click", ()=>{
            let promoteToAdminWindow = document.getElementById('AddingNewAdmin');
            promoteToAdminWindow.style.display = "flex";
            AddingNewAdmin(LoggedIn)
        })
        let addShop = document.createElement('button');
		addShop.innerText = 'Добавить магазин';
        addShop.setAttribute('id', 'FunctionalBtns');
		addShop.addEventListener("click", ()=>{
			AddingNewShop(LoggedIn)
		})
        let deleteShop = document.createElement('button');
		deleteShop.innerText = 'Закрыть магазин';
        deleteShop.setAttribute('id', 'FunctionalBtns');
		deleteShop.addEventListener('click', ()=>{
			DeleteShop(LoggedIn)
		})

        await ListOfApplication(LoggedIn)

        let exit = document.getElementById('Exit');
        exit.addEventListener('click', ()=>{
            location.reload()
        })

        functional.append(addNewUser,/*promoteToSeller,demoteSeller,*/promoteToAdmin,addShop,deleteShop);
        lol.append(functional);

        ListOfShops()

    }else if(Role == 1){
        document.getElementById('Role').innerHTML = "Статус: Продавец";
        let functional = document.getElementById('Functional');

        let ListOfShops = document.getElementById('ListOfShops');
        ListOfShops.style.display = "none";

        let resignationLetter = document.createElement('button')
        resignationLetter.textContent = 'Заявка на увольнение';
        resignationLetter.setAttribute('id', 'resignationLetter');
        resignationLetter.addEventListener('click', ()=>{
            ResignationLetter(LoggedIn);
        })


        let writeComment = document.createElement('button');
        writeComment.textContent = "Оставить комментарий на отзыв"
        writeComment.setAttribute('id','writeComment')
        writeComment.addEventListener('click', ()=>{
            WriteComment(LoggedIn)
        })

		let exit = document.getElementById('Exit');
        exit.addEventListener('click', ()=>{
            location.reload()
        })

        functional.append(resignationLetter, writeComment);
        lol.append(functional);
    }else{
        document.getElementById('Role').innerHTML = "Статус: Покупатель";
        let functional = document.getElementById('Functional');

        let ListOfShops = document.getElementById('ListOfShops');
        ListOfShops.style.display = "none";

        let jobApplicationSeller = document.createElement('button');
        jobApplicationSeller.innerText = 'Заявка на устройство';
        jobApplicationSeller.setAttribute('id','JobApplication');
        jobApplicationSeller.addEventListener('click', ()=>{
            JobApplicationSeller(LoggedIn)
        })

        let writeReview = document.createElement('button');
        writeReview.textContent = 'Написать отзыв';
        writeReview.setAttribute('id','ReviewWriting');
        writeReview.addEventListener('click', ()=>{
            WriteReview(LoggedIn)
        })

        let writeComment = document.createElement('button');
        writeComment.textContent = 'Написать комментарий';
        writeComment.setAttribute('id','CommentWritting')
        writeComment.addEventListener('click', ()=>{
            WriteComment(LoggedIn);
        })

		let exit = document.getElementById('Exit');
        exit.addEventListener('click', ()=>{
            location.reload()
        })

        functional.append(jobApplicationSeller, writeReview, writeComment);
        lol.append(functional);
    }
}