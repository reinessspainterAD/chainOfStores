import { getShopAddresses } from "../getAddresses/getShopAddresses.js";
import contractInstance from "../../contractInstance.js";
export async function ListOfShops(){
    let div = document.getElementById('ListOfShops');
    let shopAddresses = getShopAddresses();
    (await shopAddresses).forEach(async address =>{
        if(address != "0x0000000000000000000000000000000000000000"){
            let shop = await contractInstance.methods.shops(address).call();
            const p = document.createElement('p');
            p.setAttribute('id','ShopElem');
            p.textContent = `Город: ${shop.city} / Адрес: ${shop.shopAddress} / АдресАкк: ${address}`
            div.appendChild(p);
        }
        
    })
}