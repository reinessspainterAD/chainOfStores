// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract ChainOfStores{
    enum UserType {Admin, Seller, Buyer}
    //Пользователи
    struct User{
        string name;
        UserType role;
        string login;
        uint idShop;
    }
    mapping(address => User) public users;
    address[] public userAddresses;
    
    function getUserAddressesCount() public view returns(uint) {
        return userAddresses.length;
    }

    //Магазин
    struct Shop{
        string city;
        string shopAddress;
    }
    mapping (address => Shop) public shops;
    address[] public shopAddresses;

    function getShopAddressesCount() public view returns(uint) {
        return shopAddresses.length;
    }

    //Запрос
    struct application{
        address fromWhom;
        string request;
        bool considered;
        uint shopId;
    }
    application[] public applications;
    
    function getApplicationCount() public view returns(uint) {
        return applications.length;
    }

    //Отзыв
    struct review {
        uint idShop;
        address fromWhom;
        string review;
        uint rating;
    }
    review[] public bookReviews;

    //Комментарий
    struct comment {
        address fromWhom;
        string review;
        bool like;
    }
    mapping (uint => comment[]) public comments;
/*----------------------------------------------------------------Блок Modifiers-------------------------------------------------------------------*/

    modifier OnlyAdmin(){
        require(users[msg.sender].role == UserType.Admin, "Only admin can call this function");
        _;
    }

    modifier OnlySeller(){
        require(users[msg.sender].role == UserType.Seller, "Only seller can call thin function");
        _;
    }

    modifier OnlyBuyer(){
        require(users[msg.sender].role == UserType.Buyer, "Only buyer can call this function");
        _;
    }

 // Он User
    modifier CheckUser(address _userAddress){
        bool exists = false;
        for (uint i = 0; i < userAddresses.length; i++) {
            if (_userAddress == userAddresses[i]) {
                exists = true;
                break;
            }
        }
        require(exists, "Address is not registered as a user");
        _;
    }
    
 // Не User
    modifier NotCheckUser(address _userAddress){
        bool exists = true;
        for (uint i = 0; i < userAddresses.length; i++) {
            if (_userAddress == userAddresses[i]) {
                exists = false;
                break;
            }
        }
        require(exists, "Address already registered as a user");
        _;
    }
 // Он Shop
    modifier CheckShop(address _shopAddress){
        bool exists = false;
        for (uint i = 0; i < shopAddresses.length; i++) {
            if (_shopAddress == shopAddresses[i]) {
                exists = true;
                break;
            }
        }
        require(exists, "Address is not registered as a shop");
        _;
    }

 // Не Shop
    modifier NotCheckShop(address _shopAddress){
        bool exists = true;
        for (uint i = 0; i < shopAddresses.length; i++) {
            if (_shopAddress == shopAddresses[i]) {
                exists = false;
                break;
            }
        }
        require(exists, "Address already registered as a shop");
        _;
    }
//
    constructor(){
        shops[0x0000000000000000000000000000000000000000] = Shop("Null","Not");
        shopAddresses.push(0x0000000000000000000000000000000000000000);
        users[0x3077D5D952B8BFeb2D5E898B21b655a246358498] = User("Daniel", UserType.Admin, "reinessspainter", 0);
        userAddresses.push(0x3077D5D952B8BFeb2D5E898B21b655a246358498);
        users[0xE670a7ba45bEBe7c99b7617DEFc2CAc994D627F7] = User("Ivan", UserType.Buyer, "test", 0);
        userAddresses.push(0xE670a7ba45bEBe7c99b7617DEFc2CAc994D627F7);
    }

/*---------------------------------------------------------------Блок функций админа----------------------------------------------------------------*/

    //Добавление нового пользователя
    function addUser( address _userAddress, string memory _userName, string memory _login)
    public OnlyAdmin  NotCheckShop(_userAddress){
        require(users[_userAddress].role != UserType.Buyer, "This address is already a buyer"); 
        //Добавить проверку на магазин
        User memory newUser;
        newUser.name = _userName;
        newUser.role = UserType.Buyer;
        newUser.login = _login;
        newUser.idShop = 0;
        users[_userAddress] = newUser;
        userAddresses.push(_userAddress);
    }

    //Добавление нового продавца
    function PromotionToSeller(address _userAddress, uint _idShop) public  OnlyAdmin CheckUser(_userAddress) NotCheckShop(_userAddress){
        require(users[_userAddress].role != UserType.Seller, "This address is already a seller");
        require(_idShop < shopAddresses.length, "Invalid shop ID");
        require(_idShop != 0, "Store does not exists");
        for (uint i = 0; i < applications.length; i++) {
            if (applications[i].fromWhom == _userAddress) {
                // Изменяем свойство considered на true
                applications[i].considered = true;
                break; // Прерываем цикл, так как элемент найден и обновлен
            }
        }
        users[_userAddress].role = UserType.Seller;
        users[_userAddress].idShop = _idShop;
    }

    //Снятие роли продавца
    function DemoteSeller(address _userAddress) public OnlyAdmin CheckUser(_userAddress) NotCheckShop(_userAddress){
        require(users[_userAddress].role == UserType.Seller, "OnlySeller" );
        for (uint i = 0; i < applications.length; i++) {
            if (applications[i].fromWhom == _userAddress) {
                // Изменяем свойство considered на true
                applications[i].considered = true;
                break; // Прерываем цикл, так как элемент найден и обновлен
            }
        }
        users[_userAddress].role = UserType.Buyer;
        users[_userAddress].idShop = 0;
    }

    //Добавление нового администратора
    function AddingNewAdmin (address _userAddress) public OnlyAdmin CheckUser(_userAddress) NotCheckShop(_userAddress){
        require(users[_userAddress].role != UserType.Admin, "User already is Admin");
        users[_userAddress].role = UserType.Admin;
        users[_userAddress].idShop = 0;
    }
    
    //Добавление нового магазина
    function AddingShop (address _shop, string memory _city, string memory _shopAddress) public OnlyAdmin NotCheckUser(_shop){
        shops[_shop] = Shop(_city, _shopAddress);
        shopAddresses.push(_shop);
    }

    //Удаление магазина
    function DeletingShop(address _shop) public OnlyAdmin CheckShop(_shop){
        // Увольнение всех сотрудников
        for(uint i = 0; i < userAddresses.length; i++){
            if(shopAddresses[users[userAddresses[i]].idShop] == _shop){
                users[userAddresses[i]].role = UserType.Buyer;
                users[userAddresses[i]].idShop = 0;
            }
        }
        // Удаление магазина из массива и изменение маппинга
        shops[_shop] = Shop("Closed", "Closed");

        for (uint i = 0; i < shopAddresses.length; i++){
            if(_shop == shopAddresses[i]){
                for (uint j = i; j < shopAddresses.length - 1; j++) {
                    shopAddresses[j] = shopAddresses[j + 1];
                }
                shopAddresses.pop();
                break;
            }
        }
    }
//
/*---------------------------------------------------------------Блок функций Покупателя-----------------------------------------------------------------*/

    function jobApplicationSeller (uint _shopId) public CheckUser(msg.sender) OnlyBuyer{
        require(users[msg.sender].role == UserType.Buyer);
        application memory newApplication;
        newApplication.fromWhom = msg.sender;
        newApplication.request = "Seller job application";
        newApplication.considered = false;
        newApplication.shopId = _shopId;
        applications.push(newApplication);
    }
    
    function writeReview (uint256 _idShop,string memory _review, uint256 _rating)public CheckUser(msg.sender){
        require(users[msg.sender].role == UserType.Buyer);
        require(_idShop != 0, "Shop not defined");
        require(_idShop < shopAddresses.length, "Shop not defined");
        // bool _require = true;
        // for (uint i = 0; bookReviews.length > i; i++) {
        //     if (bookReviews[i].idShop == _idShop && bookReviews[i].fromWhom == msg.sender) {
        //         _require = false;
        // }}
        // require(_require, "Already write review");
        require(_rating >= 0 && _rating <= 10, "0 < ratind <= 10");
        review memory newReview;
        newReview.idShop = _idShop;
        newReview.fromWhom = msg.sender;
        newReview.review = _review;
        newReview.rating = _rating;
        bookReviews.push(newReview);
    }

    //Также и для продавца
    function writeComment (uint _idReview, string memory _review, bool _like)public CheckUser(msg.sender){
        bool _require = false;
        for (uint i = 0; userAddresses.length > i; i++){
            if (msg.sender == userAddresses[i] && (users[userAddresses[i]].role == UserType.Buyer 
            || (users[userAddresses[i]].role == UserType.Seller) 
            && users[userAddresses[i]].idShop == bookReviews[_idReview].idShop)) {
                _require = true;
            }
        }
        require(_require, "Not customer or salesman");
        require(_idReview < bookReviews.length,"Not id review");
        comment memory newComment;
        newComment.fromWhom = msg.sender;
        newComment.review = _review;
        newComment.like = _like;
        comments[_idReview].push(newComment);
    }

/*---------------------------------------------------------Блок Функций Продавца-----------------------------------------------------------*/

    //Заявка на увольнение 
    function resignationLetter () public CheckUser(msg.sender){
        require(users[msg.sender].role == UserType.Seller ||users[msg.sender].role == UserType.Admin,"Not Seller or Admin");
        application memory newApplication;
        newApplication.fromWhom = msg.sender;
        newApplication.request = "Resignation letter";
        newApplication.considered = false;
        applications.push(newApplication);
    }

}