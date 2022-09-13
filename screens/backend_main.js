
//New ID for SignUp
function generateNewID() {
    var letters = '0123456789ABCDEFGHJKLMNOPQRSTUVWXY';
    var color = '';
    for (var i = 0; i < 9; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

  }

//Unique Order ID
function uniqueOrderID(id) {

    function generate(n) {
      var add = 1, max = 12 - add;

      if ( n > max ) {
              return generate(max) + generate(n - max);
      }

      max        = Math.pow(10, n+add);
      var min    = max/10; 
      var number = Math.floor( Math.random() * (max - min + 1) ) + min;

      return ("" + number).substring(add); 
    }


    let num = generate(6)
    let str = !id?"UKNOWN":id
    let matches = str.match(/\b(\w)/g);
    var acronym = matches.join(''); 
    let trimed = acronym.substring(0,5);
    return(trimed+"-"+num)
  }

  //Unique Money Transfer ID
  
  function uniqueTransferID(id) {

    function generate(n) {
      var add = 1, max = 12 - add;

      if ( n > max ) {
              return generate(max) + generate(n - max);
      }

      max        = Math.pow(10, n+add);
      var min    = max/10; 
      var number = Math.floor( Math.random() * (max - min + 1) ) + min;

      return ("" + number).substring(add); 
    }

    
    

    let num = generate(8)
    let str = !id?"UKNOWN":id
    let matches = str.match(/\b(\w)/g);
    var acronym = matches.join(''); 
    let trimed = acronym.substring(0,6);
    return(trimed+"-mt-"+num)
  }


  //Pointer Creator
function pointerTo(objectId, klass) {
    return { __type:"Pointer", className:klass, objectId:objectId };
}

//Creation of New Account
Parse.Cloud.define("signUp", async(request, response) => {
    let myuid = generateNewID();
    // Create a new instance of the user class
    var user = new Parse.User();
        
    user.set("username", request.params.email);
    user.set("email", request.params.email);
    user.set("password", request.params.pss);
    user.set("uniqueAccNo", myuid);        
    user.set("denied", false);        
    user.set("reason_denied", [
        {
            "reason": "no reason",
            "action": "no action"
            }
        ]);        
    user.set("accountType", request.params.isDisp?2:1);
            
    let newUser = user.signUp()
    
    const AccountDetails = Parse.Object.extend("AccountDetails");
    const newAccountDetails = new AccountDetails();
    newAccountDetails.set("rating", 0);
    newAccountDetails.set("reviews", 0);
    newAccountDetails.set("currentRole", 0);
    newAccountDetails.set("person", pointerTo(newUser.id, "_User"));
    newAccountDetails.set("userNum", myuid);
    let createdAccDet = await newAccountDetails.save()


    //creating Balance Account
    const AccountBalance = Parse.Object.extend("accountBalance");
    const accBal = new AccountBalance();
    accBal.set("account", pointerTo(createdAccDet.id, "AccountDetails"));
    accBal.set("available", 0);
    accBal.set("reserved", 0);
    accBal.set("balance", 0);
    accBal.set("uid", myuid);
    accBal.set("account_key", request.params.uid);
    let myBal = await accBal.save()

    
    //Setting
    const Settings = Parse.Object.extend("settings");
    const setting = new Settings();
    setting.set("userId", myuid);
    setting.set("scanParam", 1500);
    setting.set("maptype", 1);
    setting.set("account", pointerTo(createdAccDet.id, "AccountDetails"))
    setting.set("gps_as_center", false);
    let mysetting = await setting.save()

    return ("completed")
 	
 });


Parse.Cloud.define("login", async(request, response) => {
    let user = await Parse.User.logIn(request.params.email, request.params.pss)
    
    const query = new Parse.Query("AccountDetails");            
    query.equalTo("userNum", user.get("uniqueAccNo"));
    query.include(["area_costing"])
    let accDet= await query.first()

    const s_query = new Parse.Query("settings");            
    s_query.equalTo("userId", user.get("uniqueAccNo"));
    let mySettings= await s_query.first()

    return ({user:user, accDet:accDet, mySettings:mySettings}) 
 	
 });


Parse.Cloud.define("resetPass", async(request, response) => {
    let res = await Parse.User.requestPasswordReset(request.params.email)
    return ("completed")
 	
 });


 Parse.Cloud.define("scanMyHood_Riders", async(request, response) => {

    const myHome = (new Parse.GeoPoint(request.params.myNewLat, request.params.myNewLong));

    const neighQuery = new Parse.Query("AccountDetails");
    if (request.params.gps_as_center===true){
        neighQuery.withinKilometers("coordinates", (new Parse.GeoPoint(request.params.liveLat, request.params.liveLong)), request.params.scanParam/1000 , true);
    }else{
        neighQuery.withinKilometers("coordinates", myHome, request.params.scanParam/1000 , true);
    }
    neighQuery.equalTo("currentRole", 1);
    //neighQuery.include(["person"])
    neighQuery.include("person")

    let riders = await neighQuery.find()   


    return (riders) 
 	
 });
 
 Parse.Cloud.define("scanMyHood_Orders", async(request, response) => {

    const myHome = (new Parse.GeoPoint(request.params.myNewLat, request.params.myNewLong));

    const neighQuery = new Parse.Query("AccountDetails");
    if (request.params.gps_as_center===true){
        neighQuery.withinKilometers("coordinates", (new Parse.GeoPoint(request.params.liveLat, request.params.liveLong)), request.params.scanParam/1000 , true);
    }else{
        neighQuery.withinKilometers("coordinates", myHome, request.params.scanParam/1000 , true);
    }
 
    const myHood_orders = new Parse.Query("orders_online");
    myHood_orders.matchesKeyInQuery("requestor", "objectId", neighQuery);
    myHood_orders.equalTo("engaged", false)
    myHood_orders.include("order")
    myHood_orders.include("requestor")
    myHood_orders.include("requestor.person")
    
    let orders = await myHood_orders.find()   


    return (orders) 
 	
 });


 //Send Request
Parse.Cloud.define("sendOrder", async(request, response) => {
    const waiting_query = new Parse.Query("orders_waiting");
    waiting_query.equalTo("order", pointerTo(request.params.selectedOrder.objectId, "orders_online"))
    waiting_query.equalTo("requestor",pointerTo(request.params.userDet.objectId, "AccountDetails"))
    waiting_query.equalTo("dispatcher", pointerTo(request.params.selected_dispatcher.objectId, "AccountDetails"))
    waiting_query.equalTo("initiator", pointerTo(request.params.selected_dispatcher.objectId, "AccountDetails"))
    let check = await waiting_query.first()
    
    if(!check){
        const WaitingOrders = Parse.Object.extend("orders_waiting");
        const waiting_order = new WaitingOrders();
        waiting_order.set("order", pointerTo(request.params.selectedOrder.objectId, "orders_online"))
        waiting_order.set("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"))
        waiting_order.set("dispatcher", pointerTo(request.params.selected_dispatcher.objectId, "AccountDetails"))
        waiting_order.set("initiator", pointerTo(request.params.userDet.objectId, "AccountDetails"))
        waiting_order.set("type", 1)
                           
        let sentOrder = await waiting_order.save()

        return 200
    }else if (check){
        return 201
    }         	
 });


 //Take Request
Parse.Cloud.define("takeOrder", async(request, response) => {
    const waiting_query = new Parse.Query("orders_waiting");
    waiting_query.equalTo("order", pointerTo(request.params.selectedOrder.objectId, "orders_online"))
    waiting_query.equalTo("requestor", pointerTo(request.params.selected_requestor.objectId, "AccountDetails"))
    waiting_query.equalTo("dispatcher", pointerTo(request.params.userDet.objectId, "AccountDetails"))
    waiting_query.equalTo("initiator", pointerTo(request.params.userDet.objectId, "AccountDetails"))
    let check = await waiting_query.first()

    if(!check){
         const WaitingOrders = Parse.Object.extend("orders_waiting");
        const waiting_order = new WaitingOrders();
        waiting_order.set("order", pointerTo(request.params.selectedOrder.objectId, "orders_online"))
        waiting_order.set("requestor", pointerTo(request.params.selected_requestor.objectId, "AccountDetails"))
        waiting_order.set("dispatcher", pointerTo(request.params.userDet.objectId, "AccountDetails"))
        waiting_order.set("initiator", pointerTo(request.params.userDet.objectId, "AccountDetails"))
        waiting_order.set("type", 1)
                           
        let sentOrder = await waiting_order.save() 

        return 200

    }else if(check){
                    
        return 201
    }

     	
 });


 //Get my Orders
 Parse.Cloud.define("getMyOrders", async(request, response)=>{
    const orders_query = new Parse.Query("orders");            
    orders_query.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    orders_query.include("requestor.person")
    orders_query.descending("createdAt");
    orders_query.include("receiverOnBasket.person")
    let orders= await orders_query.find()

    return orders
 })
 
 
 //Get my Balance Info
 Parse.Cloud.define("getMyBal", async(request, response)=>{
    const accBalance = new Parse.Query("accountBalance");            
    accBalance.equalTo("account", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    accBalance.equalTo("uid", request.params.myID);
    let myBal= await accBalance.first()

    return (myBal)
 })


 Parse.Cloud.define("saveOrder", async(request, response) => {
    const Order = Parse.Object.extend("orders");
    const order = new Order();
    order.set("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    order.set("order_id",uniqueOrderID(request.params.userDet.userNum));
    order.set("title", request.params.packageName===""?"Unnamed Package":request.params.packageName);
    order.set("discription", request.params.packageDisc===""? "No discription":request.params.packageDisc);
    order.set("finish_point", new Parse.GeoPoint({latitude: parseFloat(request.params.receiverLat) , longitude: parseFloat(request.params.receiverLong)}));
    order.set("weight", parseFloat((Math.round(request.params.packageWeight * 100) / 100).toFixed(2)));
    order.set("value", parseFloat((Math.round(request.params.packageWorth * 100) / 100).toFixed(2)));
    order.set("online_status", request.params.isGoOnline);                 
    order.set("destination_address", request.params.receiverGPGPS===""? "No Address": request.params.receiverGPGPS);
    order.set("receiver_id_type", request.params.receiverClaimIDType===""?"No specified type":request.params.receiverClaimIDType);
    order.set("receiver_id_no", request.params.receiverClaimIDNo===""?"No ID":request.params.receiverClaimIDNo);
    order.set("receiver_name", request.params.receiverName===""?"No name":request.params.receiverName);
    order.set("receiver_phone", request.params.receiverPhone===""?"No Phone Number":request.params.receiverPhone);
    order.set("receivers_area_name", request.params.receiverLocationName===""?"No Location":request.params.receiverLocationName);
    order.set("total_bill", request.params.totalSum ===0 ? 19.56 : parseFloat((Math.round(request.params.totalSum * 100) / 100).toFixed(2)));
    order.set("status", request.params.isGoOnline===false ? 0: 1);
    order.set("distance", request.params.roadDistance);
    order.set("est_duration", request.params.duration);
    order.set("service_charge", request.params.userDet.area_costing.service_charge);
    order.set("tax_charges", ((request.params.userDet.area_costing.taxRate_percentage/100) * request.params.totalSum));
    if(!request.params.personFoundByID){}else if(request.params.personFoundByID){order.set("receiverOnBasket", pointerTo(request.params.personFoundByID.objectId, "AccountDetails"))} 


    let createdOrder = await order.save()

    if(createdOrder.get("online_status")===true){
            //Adjust Account
            const accBalance = new Parse.Query("accountBalance");
            accBalance.equalTo("account", pointerTo(request.params.userDet.objectId, "AccountDetails"))
            accBalance.equalTo("uid", request.params.userDet.userNum)
            let accDone = await accBalance.first()

            accDone.set("available", accDone.get("available")-(request.params.totalSum+request.params.userDet.area_costing.service_charge))
            accDone.set("reserved",accDone.get("reserved")+(request.params.totalSum+request.params.userDet.area_costing.service_charge))
            let newBal = await accDone.save()

            const OrdersOnline = Parse.Object.extend("orders_online");
            const orderOnline = new OrdersOnline();
            orderOnline.set("engaged", false);
            orderOnline.set("order", createdOrder);
            orderOnline.set("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
            orderOnline.set("status", 0);

            let putOnline = await orderOnline.save()
            
            return createdOrder


        }else {
            return createdOrder
        }

 	
 });




 Parse.Cloud.define("updateOrder", async(request, response) => {
    //Find the Order to Update
    const o_query = new Parse.Query("orders");            
    o_query.equalTo("objectId", request.params.itemToEdit.objectId);
    let thisOrder = await o_query.first()

    thisOrder.set("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    thisOrder.set("order_id",request.params.itemToEdit.order_id);
    thisOrder.set("title", request.params.packageName===""?"Unnamed Package":request.params.packageName);
    thisOrder.set("discription", request.params.packageDisc===""? "No discription":request.params.packageDisc);
    thisOrder.set("finish_point", new Parse.GeoPoint({latitude: parseFloat(request.params.receiverLat) , longitude: parseFloat(request.params.receiverLong)}));
    thisOrder.set("weight", parseFloat((Math.round(request.params.packageWeight * 100) / 100).toFixed(2)));
    thisOrder.set("value", parseFloat((Math.round(request.params.packageWorth * 100) / 100).toFixed(2)));
    thisOrder.set("online_status", request.params.isGoOnline);                 
    thisOrder.set("destination_address", request.params.receiverGPGPS===""? "No Address": request.params.receiverGPGPS);
    thisOrder.set("receiver_id_type", request.params.receiverClaimIDType===""?"No specified type":request.params.receiverClaimIDType);
    thisOrder.set("receiver_id_no", request.params.receiverClaimIDNo===""?"No ID":request.params.receiverClaimIDNo);
    thisOrder.set("receiver_name", request.params.receiverName===""?"No name":request.params.receiverName);
    thisOrder.set("receiver_phone", request.params.receiverPhone===""?"No Phone Number":request.params.receiverPhone);
    thisOrder.set("receivers_area_name", request.params.receiverLocationName===""?"No Location":request.params.receiverLocationName);
    thisOrder.set("total_bill", request.params.totalSum ===0 ? 19.56 : parseFloat((Math.round(request.params.totalSum * 100) / 100).toFixed(2)));
    thisOrder.set("distance", request.params.roadDistance);
    thisOrder.set("est_duration", request.params.duration);
    thisOrder.set("service_charge", request.params.userDet.area_costing.service_charge);
    thisOrder.set("tax_charges", ((request.params.userDet.area_costing.taxRate_percentage/100) * request.params.totalSum));
    if(!request.params.personFoundByID){}else if(request.params.personFoundByID){thisOrder.set("receiverOnBasket", pointerTo(request.params.personFoundByID.objectId, "AccountDetails"))} 
    if(request.params.isGoOnline===true && request.params.itemToEdit.status===0 ){
        thisOrder.set("status", 1)
    }else if(request.params.isGoOnline===true && request.params.itemToEdit.status!==0){
        thisOrder.set("status", request.params.itemToEdit.status)
    }else if(request.params.isGoOnline===false){
        thisOrder.set("status", 0);
    }


    let updatedOrder = await order.save()

    //Adjust Account
    const accBalance = new Parse.Query("accountBalance");
    accBalance.equalTo("account", pointerTo(request.params.userDet.objectId, "AccountDetails"))
    accBalance.equalTo("uid", request.params.userDet.userNum)
    let myAccBal = await accBalance.first()

    if(updatedOrder.get("online_status")===true){

            if(request.params.itemToEdit.online_status===true){                               
                myAccBal.set("available", (myAccBal.get("available")+(request.params.itemToEdit.total_bill+request.params.itemToEdit.service_charge))-(request.params.totalSum+request.params.totalServiceCarge))
                myAccBal.set("reserved",(myAccBal.get("reserved")-(request.params.itemToEdit.total_bill+request.params.itemToEdit.service_charge))+(request.params.totalSum+request.params.totalServiceCarge))
            }else if(request.params.itemToEdit.online_status===false){
                myAccBal.set("available", (myAccBal.get("available"))-(request.params.totalSum+request.params.totalServiceCarge))
                myAccBal.set("reserved",(myAccBal.get("reserved"))+(request.params.totalSum+request.params.totalServiceCarge))
            }

            


            //Update Orders Online
            const orderOnline = new Parse.Query("orders_online");
            orderOnline.equalTo("order", updatedOrder);
            orderOnline.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
            let theOrderFoundOnline = await orderOnline.first()  
            
            
            


        }else {
            if(request.params.itemToEdit.online_status===true){
                //Update Account
                myAccBal.set("available", myAccBal.get("available")+(request.params.itemToEdit.total_bill+request.params.itemToEdit.service_charge))
                myAccBal.set("reserved", myAccBal.get("reserved")-(request.params.itemToEdit.total_bill+request.params.itemToEdit.service_charge))
            }else if(request.params.itemToEdit.online_status===false){
                //Leave as it is   
            }


        
        }


        let newBal = await myAccBal.save()
        return updatedOrder

 	
 });


 //Check Editability
 Parse.Cloud.define("checkEditability", async(request, response)=>{
    const orderRunning = new Parse.Query("orders_running");            
    orderRunning.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    orderRunning.equalTo("order", pointerTo(request.params.item.objectId, "orders"));

    let theOrder= await orderRunning.first()

    if(!theOrder){
        return 200
    }else if(theOrder){
        return 201
    }

 })
 
 //Delete Order
 Parse.Cloud.define("deleteOrder", async(request, response)=>{
    const Query_Order = new Parse.Query("orders");            
    Query_Order.notEqualTo("status",2)
    Query_Order.equalTo("objectId", request.params.itemDel.objectId)
    let obj = await Query_Order.first()


    if(!obj){
        return 201
    }else if(obj){
        const order_waiting = new Parse.Query("orders_waiting");
        order_waiting.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"))
        order_waiting.include("order")

        let ordersPending = await order_waiting.find()
            ordersPending.forEach(function (arrayItem) {
            if(arrayItem.get("order").get("order")===obj){
                arrayItem.destroy()
                }     
            });
      
        const order_online = new Parse.Query("orders_online");
        order_online.equalTo("order", obj)
        order_online.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"))

        let orderFound = await order_online.first()
        if(!orderFound){

        }else if(orderFound){
            orderFound.destroy()
        }

        obj.destroy()

        return 200

    }

 })


 //Clone Order
 Parse.Cloud.define("cloneOrder", async(request, response)=>{
    const Order = Parse.Object.extend("orders");
    const newOrder = new Order();
    newOrder.set("requestor", pointerTo(request.params.itemDel.get("requestor").objectId, "AccountDetails") )
    newOrder.set("order_id", uniqueOrderID())
    newOrder.set("title", request.params.itemDel.title+"_copy")
    newOrder.set("discription", request.params.itemDel.discription)
    newOrder.set("finish_point", request.params.itemDel.finish_point)
    newOrder.set("weight", request.params.itemDel.weight)
    newOrder.set("value", request.params.itemDel.value)
    newOrder.set("online_status", false)
    newOrder.set("destination_address", request.params.itemDel.destination_address)
    newOrder.set("receiver_id_type", request.params.itemDel.receiver_id_type)
    newOrder.set("receiver_id_no", request.params.itemDel.receiver_id_no)
    newOrder.set("receiver_name", request.params.itemDel.receiver_name)
    newOrder.set("receiver_phone",request.params.itemDel.receiver_phone)
    newOrder.set("receivers_area_name", request.params.itemDel.receivers_area_name)
    newOrder.set("receiverOnBasket", !request.params.itemDel.receiverOnBasket?null: pointerTo(request.params.itemDel.receiverOnBasket.objectId, "AccountDetails") )
    newOrder.set("status", 0)
    newOrder.set("total_bill", request.params.itemDel.total_bill)
    newOrder.set("distance", request.params.itemDel.distance)
    newOrder.set("est_duration", request.params.itemDel.est_duration)
    newOrder.set("tax_charges", request.params.itemDel.tax_charges)
    newOrder.set("service_charge", request.params.itemDel.service_charge)
    

    let theClone = await newOrder.save()

    if(!theClone){
        return 201
    }else if(theClone){
        return 200
    }

 })


 Parse.Cloud.define("pending_deals", async(request, response) => {

    const inOut_reqs = new Parse.Query("orders_waiting");            
    inOut_reqs.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    inOut_reqs.include("order.order");
    inOut_reqs.include("dispatcher.person");
    
    
    const inOut_dispatch = new Parse.Query("orders_waiting");            
    inOut_dispatch.equalTo("dispatcher", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    inOut_dispatch.include("order.order");
    inOut_dispatch.include("requestor.person");

    const combo = Parse.Query.or(inOut_reqs, inOut_dispatch);
    combo.include("order.order");
    combo.include("initiator");
    combo.include("order.order.receiverOnBasket");
    combo.include("dispatcher.person");
    combo.include("requestor.person");
    combo.descending("updatedAt");


    let my_pending_deals = await combo.find()

    return (my_pending_deals) 
 	
 });


 Parse.Cloud.define("running_deals", async(request, response) => {

    const active_reqs = new Parse.Query("orders_running");            
    active_reqs.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    active_reqs.include("order");
    active_reqs.include("dispatcher.person");
    
    
    const active_dispatch = new Parse.Query("orders_running");            
    active_dispatch.equalTo("dispatcher", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    active_dispatch.include("order");
    active_dispatch.include("requestor.person");

    const combo = Parse.Query.or(active_reqs, active_dispatch);
    combo.include("order");
    combo.include("dispatcher.person");
    combo.include("requestor.person");
    combo.descending("updatedAt");

    let my_active_deals = await combo.find()

    return (my_active_deals) 
 	
 });


 Parse.Cloud.define("completed_deals", async(request, response) => {

    const completedOrders_reqs = new Parse.Query("orders_completed");            
    completedOrders_reqs.equalTo("requestor", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    completedOrders_reqs.include("order");
    completedOrders_reqs.include("dispatcher.person");
    
    
    const completedOrders_dispatch = new Parse.Query("orders_completed");            
    completedOrders_dispatch.equalTo("dispatcher", pointerTo(request.params.userDet.objectId, "AccountDetails"));
    completedOrders_dispatch.include("order");
    completedOrders_dispatch.include("requestor.person");

    const combo = Parse.Query.or(completedOrders_reqs, completedOrders_dispatch);
    combo.equalTo("visibility_status",1)
    combo.include("order");
    combo.include("requestor.person");
    combo.include("dispatcher.person");
    combo.descending("updatedAt");
    


    let my_completed_deals = await combo.find()

    return (my_completed_deals) 
 	
 });


  
 //Reject Order
Parse.Cloud.define("rejectOrder", async(request, response)=>{
    const query_pendingDeals = new Parse.Query("orders_waiting");            
    let theDeal = await query_pendingDeals.get(request.params.itemDecide.objectId)
    theDeal.destroy()

    return 200


})


//Accept Order
Parse.Cloud.define("acceptOrder", async(request, response)=>{
    const query_pendingDeals = new Parse.Query("orders_waiting");            
    query_pendingDeals.equalTo("objectId", request.params.itemDecide.objectId)   
    query_pendingDeals.include("order.order")        
    query_pendingDeals.include("requestor")        
    query_pendingDeals.include("dispatcher")        
    query_pendingDeals.include("initiator") 

    let grabbedOrder = await query_pendingDeals.first()

    //Copy order to Running Orders
    const OrdersRunning = Parse.Object.extend("orders_running");       
    const order_taken = new OrdersRunning();
    //console.log(grabbedOrder.get("requestor").person)
    order_taken.set("order", grabbedOrder.get("order").get("order"))
    order_taken.set("requestor", grabbedOrder.get("requestor"))
    order_taken.set("dispatcher", grabbedOrder.get("dispatcher"))
    order_taken.set("initiator", grabbedOrder.get("initiator").get("userNum"))
    order_taken.set("time_signed", new Date())
    order_taken.set("handShakeCode", grabbedOrder.get("order").get("order").get("receiver_id_no"))
    let running = await order_taken.save()
        //Updating status in Orders
        const orders = new Parse.Query("orders");
        let theOrder = await orders.get(request.params.itemDecide.order.order.objectId)
            theOrder.set("online_status", true)
            theOrder.set("status", 2)
            theOrder.save()
        
    // Remove the order from Pending List
    grabbedOrder.destroy()

    //remove all copies in waiting
    const queryOrderWaitingCopies = new Parse.Query("orders_waiting");
    queryOrderWaitingCopies.equalTo("order", pointerTo(request.params.itemDecide.order.objectId, "orders_online"))
    queryOrderWaitingCopies.equalTo("requestor", pointerTo(request.params.itemDecide.get("requestor").objectId, "AccountDetails"))
    let copiesPending = await queryOrderWaitingCopies.find()

    if(copiesPending.length > 0){
        let indexCounter = 0;
        while(indexCounter < copiesPending.length){
          copiesPending[indexCounter].destroy();
          indexCounter += 1;
        }
    }
    
    return 200

 })


  //Reject Order
Parse.Cloud.define("confirmPickup", async(request, response)=>{
    const queryOrderRunning = new Parse.Query("orders_running");            
    let orderOnDB = await queryOrderRunning.get(request.params.selectedDeal.objectId)
    
        orderOnDB.set("stage1_ItemPicked",true)
        orderOnDB.set("pickTime", new Date())
        orderOnDB.save()

    return 200


})


  //Reject Order
Parse.Cloud.define("iv_arrived", async(request, response)=>{
    const queryOrderRunning = new Parse.Query("orders_running");            
    let orderOnDB = await queryOrderRunning.get(request.params.selectedDeal.objectId)

        orderOnDB.set("stage2_DispatcherArrived", true)
        orderOnDB.set("dispatcher_arrival_time", new Date())
        orderOnDB.save()

        return 200

})


  //Verifz Claim ID
Parse.Cloud.define("verifyClaimID", async(request, response)=>{
    const queryOrderRunning = new Parse.Query("orders_running");            
    let orderOnDB = await queryOrderRunning.get(request.params.selectedDeal.objectId)
    
    if(orderOnDB.get("code_attempt")>=15){
        return 500
        //Send Notification to Requestor
    }else if(orderOnDB.get("code_attempt")<15){
        if(request.params.enteredClaimID === orderOnDB.get("handShakeCode")){
            orderOnDB.set("stage2_DispatcherArrived", true)
            orderOnDB.set("dispatcher_arrival_time", new Date())
            orderOnDB.set("stage3_HandShake", true)
            orderOnDB.set("handShake_time", new Date())
            orderOnDB.set("handShakeVerified", 1)
                         
            orderOnDB.save()
            return 200
        }else if(request.params.enteredClaimID !== orderOnDB.get("handShakeCode")){
            orderOnDB.set("code_attempt", orderOnDB.get("code_attempt")+1)
            await orderOnDB.save()
            return(orderOnDB.get("code_attempt"))
        }
        
    }
        
    
})


//Close Order
Parse.Cloud.define("closeDeal", async(request, response)=>{
    const accountBalance = new Parse.Query("accountBalance");            
    accountBalance.equalTo("uid", request.params.userNum)
    accountBalance.equalTo("uid", request.params.selectedDeal.requestor.userNum)
    let  myAccount = await accountBalance.first()
    
    //Debit Requestors Acc
    let newBal = myAccount.get("balance")-(request.params.selectedDeal.order.total_bill+request.params.selectedDeal.order.service_charge+request.params.selectedDeal.order.tax_charges)
    let reserved = myAccount.get("reserved")-(request.params.selectedDeal.order.total_bill+request.params.selectedDeal.order.service_charge+request.params.selectedDeal.order.tax_charges)
        myAccount.set("balance", newBal)
        myAccount.set("reserved", reserved)
        let myBalAccount = await myAccount.save()

    //Credit Dispatcher
    const accountBalanceDisp = new Parse.Query("accountBalance");
    accountBalanceDisp.equalTo("uid", request.params.selectedDeal.dispatcher.userNum)
    let beneficiary = await accountBalanceDisp.first()    
    let Bal = beneficiary.get("balance")+request.params.selectedDeal.order.total_bill
    let available = beneficiary.get("available")+request.params.selectedDeal.order.total_bill
        beneficiary.set("balance", Bal)
        beneficiary.set("available", available)
    let dispatcherBalAccount = await beneficiary.save()

    
    // Copy Transaction to Completed Order
    const OrdersCompleted = Parse.Object.extend("orders_completed");
    const ordersCompleted = new OrdersCompleted();

    if(!request.params.selectedDeal.requestor){}else if(request.params.selectedDeal.requestor){ordersCompleted.set("requestor", pointerTo(request.params.selectedDeal.requestor.objectId, "AccountDetails"))} 
    if(!request.params.selectedDeal.order){}else if(request.params.selectedDeal.order){ordersCompleted.set("order", pointerTo(request.params.selectedDeal.order.objectId, "orders"))} 
    if(!request.params.selectedDeal.dispatcher){}else if(request.params.selectedDeal.dispatcher){ordersCompleted.set("dispatcher", pointerTo(request.params.selectedDeal.dispatcher.objectId, "AccountDetails"))}
    if(!request.params.selectedDeal.initiator){ordersCompleted.set("initiatior", "No data")}else if (request.params.selectedDeal.initiator){ordersCompleted.set("initiatior", request.params.selectedDeal.initiator)}
    if(!request.params.selectedDeal.order.order_id){ordersCompleted.set("order_id", "No data")}else if(request.params.selectedDeal.order.order_id){ordersCompleted.set("order_id", request.params.selectedDeal.order.order_id)}
    if(!request.params.selectedDeal.order.title){ordersCompleted.set("order_title", "No data")}else if(request.params.selectedDeal.order.title){ordersCompleted.set("order_title", request.params.selectedDeal.order.title)}
    if(!request.params.selectedDeal.order.discription){ordersCompleted.set("order_discription", "No data")}else if(request.params.selectedDeal.order.discription){ordersCompleted.set("order_discription", request.params.selectedDeal.order.discription)}
    if(!request.params.selectedDeal.requestor.coordinates){ordersCompleted.set("order_startingPoint", {latitude:0,longitude:0})}else if(request.params.selectedDeal.requestor.coordinates){ordersCompleted.set("order_startingPoint", {latitude:request.params.selectedDeal.requestor.coordinates.latitude,longitude:request.params.selectedDeal.requestor.coordinates.longitude})}
    if(!request.params.selectedDeal.order.finish_point){ordersCompleted.set("order_finishPoint", {latitude:0, longitude:0})}else if(request.params.selectedDeal.order.finish_point){ordersCompleted.set("order_finishPoint", {latitude:request.params.selectedDeal.order.finish_point.latitude, longitude:request.params.selectedDeal.order.finish_point.longitude})}
    if(!request.params.selectedDeal.order.weight){ordersCompleted.set("order_weight", 0)}else if(request.params.selectedDeal.order.weight){ordersCompleted.set("order_weight", request.params.selectedDeal.order.weight)}
    if(!request.params.selectedDeal.order.value){ordersCompleted.set("order_value", 0)}else if(request.params.selectedDeal.order.value){ordersCompleted.set("order_value", request.params.selectedDeal.order.value)}
    if(!request.params.selectedDeal.order.destination_address){ordersCompleted.set("destination_address", "No data")}else if(request.params.selectedDeal.order.destination_address){ordersCompleted.set("destination_address", request.params.selectedDeal.order.destination_address)}
    if(!request.params.selectedDeal.order.receiver_id_no){ordersCompleted.set("receiver_id_no", "No data")}else if(request.params.selectedDeal.order.receiver_id_no){ordersCompleted.set("receiver_id_no", request.params.selectedDeal.order.receiver_id_no)}
    if(!request.params.selectedDeal.order.receiver_name){ordersCompleted.set("receiver_name", "No data")}else if(request.params.selectedDeal.order.receiver_name){ordersCompleted.set("receiver_name", request.params.selectedDeal.order.receiver_name)}
    if(!request.params.selectedDeal.order.receiverOnBasket){}else if (request.params.selectedDeal.order.receiverOnBasket){ordersCompleted.set("receiverOnBasket", pointerTo(request.params.selectedDeal.order.receiverOnBasket.objectId, "AccountDetails"))}
    if(!request.params.selectedDeal.order.receiverOnBasket){ordersCompleted.set("receiverBasketID", "No data")}else if(request.params.selectedDeal.order.receiverOnBasket){ordersCompleted.set("receiverBasketID", request.params.selectedDeal.order.receiverOnBasket.userNum)}
    if(!request.params.selectedDeal.order.total_bill){ordersCompleted.set("order_total_bill", 0)}else if(request.params.selectedDeal.order.total_bill){ordersCompleted.set("order_total_bill", request.params.selectedDeal.order.total_bill)}
    if(!request.params.selectedDeal.order.tax_charges){ordersCompleted.set("tax", 0)}else if(request.params.selectedDeal.order.tax_charges){ordersCompleted.set("tax", request.params.selectedDeal.order.tax_charges)}
    if(!request.params.selectedDeal.order.distance){ordersCompleted.set("order_distance", 0)}else if(request.params.selectedDeal.order.distance){ordersCompleted.set("order_distance", request.params.selectedDeal.order.distance)}
    if(!request.params.selectedDeal.order.est_duration){ordersCompleted.set("projected_duration", 0)}else if(request.params.selectedDeal.order.est_duration){ordersCompleted.set("projected_duration", request.params.selectedDeal.order.est_duration)}
    if(!request.params.selectedDeal.order.service_charge){ordersCompleted.set("service_charge", 0)}else if(request.params.selectedDeal.order.service_charge){ordersCompleted.set("service_charge", request.params.selectedDeal.order.service_charge)}
    if(!request.params.selectedDeal.time_signed){ordersCompleted.set("order_timeSigned", new Date())}else if(request.params.selectedDeal.time_signed){ordersCompleted.set("order_timeSigned", request.params.selectedDeal.time_signed)}
    if(!request.params.selectedDeal.pickTime){ordersCompleted.set("order_timePackagePicked", new Date())}else if(request.params.selectedDeal.pickTime){ordersCompleted.set("order_timePackagePicked", request.params.selectedDeal.pickTime)}
    if(!request.params.selectedDeal.dispatcher_arrival_time){ordersCompleted.set("order_arrivalTime", new Date())}else if(request.params.selectedDeal.dispatcher_arrival_time){ordersCompleted.set("order_arrivalTime", request.params.selectedDeal.dispatcher_arrival_time)}
    if(!request.params.selectedDeal.handShake_time){ordersCompleted.set("order_handShakeTime", new Date())}else if(request.params.selectedDeal.handShake_time){ordersCompleted.set("order_handShakeTime", request.params.selectedDeal.handShake_time)}
    if(!request.params.selectedDeal.handShakeCode){ordersCompleted.set("order_handShakeCode", "No data")}else if(request.params.selectedDeal.handShakeCode){ordersCompleted.set("order_handShakeCode", request.params.selectedDeal.handShakeCode)}
    if(!myBalAccount.balance){ordersCompleted.set("requestor_accBalAsAtComp", 0)}else if(myBalAccount.balance){ordersCompleted.set("requestor_accBalAsAtComp", myBalAccount.balance)}
    if(!myBalAccount.reserved){ordersCompleted.set("requestor_accAvailableAsAtComp",0)}else if(myBalAccount.available){ordersCompleted.set("requestor_accAvailableAsAtComp", myBalAccount.available)}
    if(!request.params.selectedDeal.requestor.userNum){ordersCompleted.set("requestor_userNum", "No data")}else if(request.params.selectedDeal.requestor.userNum){ordersCompleted.set("requestor_userNum", request.params.selectedDeal.requestor.userNum)}
    if(!request.params.selectedDeal.requestor.ghanaPostAddress){ordersCompleted.set("reqs_ghanaPostAddress", "No data")}else if(request.params.selectedDeal.requestor.ghanaPostAddress){ordersCompleted.set("reqs_ghanaPostAddress", request.params.selectedDeal.requestor.ghanaPostAddress)}
    if(!request.params.selectedDeal.requestor.phone){ordersCompleted.set("reqs_phone", "No data")}else if(request.params.selectedDeal.requestor.phone){ordersCompleted.set("reqs_phone", request.params.selectedDeal.requestor.phone)}
    if(!request.params.selectedDeal.requestor.homeAddress){ordersCompleted.set("reqs_homeAddress", "No data")}else if(request.params.selectedDeal.requestor.homeAddress){ordersCompleted.set("reqs_homeAddress", request.params.selectedDeal.requestor.homeAddress)}
    if(!request.params.selectedDeal.requestor.coordinates){ordersCompleted.set("reqs_homeCords", {latitude:0,longitude:0})}else if(request.params.selectedDeal.requestor.coordinates){ordersCompleted.set("reqs_homeCords", {latitude:request.params.selectedDeal.requestor.coordinates.latitude,longitude:request.params.selectedDeal.requestor.coordinates.longitude})}
    if(!dispatcherBalAccount.balance){ordersCompleted.set("disp_accBalAsAtComp", 0)}else if(dispatcherBalAccount.balance){ordersCompleted.set("disp_accBalAsAtComp", dispatcherBalAccount.balance)}
    if(!request.params.selectedDeal.dispatcher.phone){ordersCompleted.set("disp_phone", "No data")}else if(request.params.selectedDeal.dispatcher.phone){ordersCompleted.set("disp_phone", request.params.selectedDeal.dispatcher.phone)}
    if(!request.params.selectedDeal.dispatcher.homeAddress){ordersCompleted.set("disp_HomeAddress", {
        "streetName": "No data",
        "postCode": "No data",
        "district": "No data",
        "city": "No data",
        "additional": "No data"
      })}else if(request.params.selectedDeal.dispatcher.homeAddress){ordersCompleted.set("disp_HomeAddress", request.params.selectedDeal.dispatcher.homeAddress)}
    if(!request.params.selectedDeal.institution_id){ordersCompleted.set("disp_instId", "No data")}else if(request.params.selectedDeal.institution_id){ordersCompleted.set("disp_instId", request.params.selectedDeal.institution_id)}
    if(!request.params.selectedDeal.dispatcher.ghanaPostAddress){ordersCompleted.set("disp_ghanaPostAddress", "No data")}else if(request.params.selectedDeal.dispatcher.ghanaPostAddress){ordersCompleted.set("disp_ghanaPostAddress", request.params.selectedDeal.dispatcher.ghanaPostAddress)}
    if(!request.params.selectedDeal.dispatcher.coordinates){ordersCompleted.set("disp_homeCords", {latitude:0,longitude:0})}else if(request.params.selectedDeal.dispatcher.coordinates){ordersCompleted.set("disp_homeCords", {latitude:request.params.selectedDeal.dispatcher.coordinates.latitude,longitude:request.params.selectedDeal.dispatcher.coordinates.longitude})}
    if(!request.params.selectedDeal.dispatcher.userNum){ordersCompleted.set("disp_userNum", "No data")}else if(request.params.selectedDeal.dispatcher.userNum){ordersCompleted.set("disp_userNum", request.params.selectedDeal.dispatcher.userNum)}
    if(!request.params.selectedDeal.dispatcher.person.firstname){ordersCompleted.set("disp_name", "No data")}else if(request.params.selectedDeal.dispatcher.person.firstname){ordersCompleted.set("disp_name", request.params.selectedDeal.dispatcher.person.firstname+" "+ request.params.selectedDeal.dispatcher.person.lastname)}
    if(!request.params.selectedDeal.requestor.person.firstname){ordersCompleted.set("req_name", "No data")}else if(request.params.selectedDeal.requestor.person.firstname){ordersCompleted.set("req_name", request.params.selectedDeal.requestor.person.firstname+" "+ request.params.selectedDeal.requestor.person.lastname)}
    ordersCompleted.set("visibility", 1)
    ordersCompleted.set("visibility_status", 1)

    let savedCompOrder = await ordersCompleted.save() 
    

    //Updating Order Status in Requestors Order List
    const queryOrders = new Parse.Query("orders");
    let rawOrder = await queryOrders.get(request.params.selectedDeal.order.objectId)
    rawOrder.set("online_status", true)
    rawOrder.set("status", 3)
    let rawSavedOrder = await rawOrder.save()

      

    //Make entry in Account Statement
    const FinStatement = Parse.Object.extend("financial_statement")
    const newStatementEntry = new FinStatement()
    newStatementEntry.set("transType", 1)
    newStatementEntry.set("credited_acc", pointerTo(request.params.selectedDeal.dispatcher.objectId, "AccountDetails"))
    newStatementEntry.set("debited_acc", pointerTo(request.params.selectedDeal.requestor.objectId, "AccountDetails"))
    newStatementEntry.set("asocc_task", savedCompOrder)
    newStatementEntry.set("reference", "int_pay")
    newStatementEntry.set("trans_id", uniqueTransferID(request.params.selectedDeal.order.id))
    newStatementEntry.set("internalTrans", true)
    newStatementEntry.set("amount_debited", request.params.selectedDeal.order.total_bill)
    newStatementEntry.set("amount_credited", request.params.selectedDeal.order.total_bill-(request.params.selectedDeal.order.tax_charges+request.params.selectedDeal.order.service_charge))
    newStatementEntry.set("diff_CredDebit", request.params.selectedDeal.order.tax_charges+request.params.selectedDeal.order.service_charge)
    newStatementEntry.set("discription", "Transaction transfer")

    let StatementSaved = await newStatementEntry.save()  
    
  

    //delete data in running Orders
    const queryOrders_running = new Parse.Query("orders_running");
    queryOrders_running.equalTo("order", pointerTo(request.params.selectedDeal.order.objectId, "orders"))
    queryOrders_running.equalTo("requestor", pointerTo(request.params.selectedDeal.requestor.objectId, "AccountDetails"))
    queryOrders_running.equalTo("dispatcher", pointerTo(request.params.selectedDeal.dispatcher.objectId, "AccountDetails"))

    let sortedOrder = await queryOrders_running.first()
    sortedOrder.destroy()

    return 200
    
})


//Reject Order
Parse.Cloud.define("removeFromList", async(request, response)=>{
    const completedOrder = new Parse.Query("orders_completed");            
    let obj = await completedOrder.get(request.params.compOrderToHide.objectId)
    
    if(!obj){
        return 500
        //Send Notification to Requestor
    }else if(obj.visibility_status===0){
        return 300
    }else if(obj.visibility_status===1){
        obj.set("visibility_status", 0)
        obj.save()
        return 200
    }
        

})


//Automatically Close Deals
Parse.Cloud.afterSave("orders_running", (request)=>{
    if(request.object.get("handShakeVerified") ===1 &&
       !request.object.get("payment_Done") &&
       ((!request.object.get("issue_problem") || request.object.get("issue_problem")=== false))
    ){
        //Now finsih up the payment
      
            if(!request.object.get("payment_Done") || request.object.get("payment_Done")===false){
                
                request.object.set("payment_Done", true)
                request.object.set("code_attempt", 25)
                request.object.set("handShakeCode", request.object.get("requestor").get("userNum"))
                request.object.save()
               
                //Debit Requestors Acc
                const accountBalance = new Parse.Query("accountBalance");            
                accountBalance.equalTo("uid", request.object.get("requestor").get("userNum"))
                let  myAccount = accountBalance.first()
                
                let newBal = myAccount.get("balance")-(request.object.get("order").get("total_bill")+request.object.get("order").get("service_charge")+request.object.get("order").get("tax_charges"))
                let reserved = myAccount.get("reserved")-(request.object.get("order").get("total_bill")+request.object.get("order").get("service_charge")+request.object.get("order").get("tax_charges"))
                    myAccount.set("balance", 100000)
                    myAccount.set("reserved", 100000)
                    let myBalAccount = myAccount.save()


              /*   //Credit Dispatcher
                const accountBalanceDisp = new Parse.Query("accountBalance");
                accountBalanceDisp.equalTo("uid", request.object.get("dispatcher").get("userNum"))
                let beneficiary = accountBalanceDisp.first()    
                let Bal = beneficiary.get("balance")+request.object.get("order").get("total_bill")
                let available = beneficiary.get("available")+request.object.get("order").get("total_bill")
                    beneficiary.set("balance", Bal)
                    beneficiary.set("available", available)
                let dispatcherBalAccount = beneficiary.save()

                
                // Copy Transaction to Completed Order
                const OrdersCompleted = Parse.Object.extend("orders_completed");
                const ordersCompleted = new OrdersCompleted();

                if(!request.object.get("requestor")){}else if(request.object.get("requestor")){ordersCompleted.set("requestor", request.object.get("requestor"))} 
                if(!request.object.get("order")){}else if(request.object.get("order")){ordersCompleted.set("order", request.object.get("order"))} 
                if(!request.object.get("dispatcher")){}else if(request.object.get("dispatcher")){ordersCompleted.set("dispatcher", request.object.get("dispatcher"))}
                if(!request.object.get("initiator")){ordersCompleted.set("initiatior", "No data")}else if (request.object.get("initiator")){ordersCompleted.set("initiatior", request.object.get("initiator"))}
                if(!request.object.get("order").get("order_id")){ordersCompleted.set("order_id", "No data")}else if(request.object.get("order").get("order_id")){ordersCompleted.set("order_id", request.object.get("order").get("order_id"))}
                if(!request.object.get("order").get("title")){ordersCompleted.set("order_title", "No data")}else if(request.object.get("order").get("title")){ordersCompleted.set("order_title", request.object.get("order").get("title"))}
                if(!request.object.get("order").get("discription")){ordersCompleted.set("order_discription", "No data")}else if(request.object.get("order").get("discription")){ordersCompleted.set("order_discription", request.object.get("order").get("discription"))}
                if(!request.object.get("requestor").get("coordinates")){ordersCompleted.set("order_startingPoint", {latitude:0,longitude:0})}else if(request.object.get("requestor").get("coordinates")){ordersCompleted.set("order_startingPoint", {latitude:request.object.get("requestor").get("coordinates").latitude,longitude:request.object.get("requestor").get("coordinates").longitude})}
                if(!request.object.get("order").get("finish_point")){ordersCompleted.set("order_finishPoint", {latitude:0, longitude:0})}else if(request.object.get("order").get("finish_point")){ordersCompleted.set("order_finishPoint", {latitude:request.object.get("order").get("finish_point").latitude, longitude:request.object.get("order").get("finish_point").longitude})}
                if(!request.object.get("order").get("weight")){ordersCompleted.set("order_weight", 0)}else if(request.object.get("order").get("weight")){ordersCompleted.set("order_weight", request.object.get("order").get("weight"))}
                if(!request.object.get("order").get("value")){ordersCompleted.set("order_value", 0)}else if(request.object.get("order").get("value")){ordersCompleted.set("order_value", request.object.get("order").get("value"))}
                if(!request.object.get("order").get("destination_address")){ordersCompleted.set("destination_address", "No data")}else if(request.object.get("order").get("destination_address")){ordersCompleted.set("destination_address", request.object.get("order").get("destination_address"))}
                if(!request.object.get("order").get("receiver_id_no")){ordersCompleted.set("receiver_id_no", "No data")}else if(request.object.get("order").get("receiver_id_no")){ordersCompleted.set("receiver_id_no", request.object.get("order").get("receiver_id_no"))}
                if(!request.object.get("order").get("receiver_name")){ordersCompleted.set("receiver_name", "No data")}else if(request.object.get("order").get("receiver_name")){ordersCompleted.set("receiver_name", request.object.get("order").get("receiver_name"))}
                if(!request.object.get("order").get("receiverOnBasket")){}else if (request.object.get("order").get("receiverOnBasket")){ordersCompleted.set("receiverOnBasket", request.object.get("order").get("receiverOnBasket"))}
                if(!request.object.get("order").get("receiverOnBasket")){ordersCompleted.set("receiverBasketID", "No data")}else if(request.object.get("order").get("receiverOnBasket")){ordersCompleted.set("receiverBasketID", request.object.get("order").get("receiverOnBasket").get("userNum"))}
                if(!request.object.get("order").get("total_bill")){ordersCompleted.set("order_total_bill", 0)}else if(request.object.get("order").get("total_bill")){ordersCompleted.set("order_total_bill", request.object.get("order").get("total_bill"))}
                if(!request.object.get("order").get("tax_charges")){ordersCompleted.set("tax", 0)}else if(request.object.get("order").get("tax_charges")){ordersCompleted.set("tax", request.object.get("order").get("tax_charges"))}
                if(!request.object.get("order").get("distance")){ordersCompleted.set("order_distance", 0)}else if(request.object.get("order").get("distance")){ordersCompleted.set("order_distance", request.object.get("order").get("distance"))}
                if(!request.object.get("order").get("est_duration")){ordersCompleted.set("projected_duration", 0)}else if(request.object.get("order").get("est_duration")){ordersCompleted.set("projected_duration", request.object.get("order").get("est_duration"))}
                if(!request.object.get("order").get("service_charge")){ordersCompleted.set("service_charge", 0)}else if(request.object.get("order").get("service_charge")){ordersCompleted.set("service_charge", request.object.get("order").get("service_charge"))}
                if(!request.object.get("time_signed")){ordersCompleted.set("order_timeSigned", new Date())}else if(request.object.get("time_signed")){ordersCompleted.set("order_timeSigned", request.object.get("time_signed"))}
                if(!request.object.get("pickTime")){ordersCompleted.set("order_timePackagePicked", new Date())}else if(request.object.get("pickTime")){ordersCompleted.set("order_timePackagePicked", request.object.get("pickTime"))}
                if(!request.object.get("dispatcher_arrival_time")){ordersCompleted.set("order_arrivalTime", new Date())}else if(request.object.get("dispatcher_arrival_time")){ordersCompleted.set("order_arrivalTime", request.object.get("dispatcher_arrival_time"))}
                if(!request.object.get("handShake_time")){ordersCompleted.set("order_handShakeTime", new Date())}else if(request.object.get("handShake_time")){ordersCompleted.set("order_handShakeTime", request.object.get("handShake_time"))}
                if(!request.object.get("handShakeCode")){ordersCompleted.set("order_handShakeCode", "No data")}else if(request.object.get("handShakeCode")){ordersCompleted.set("order_handShakeCode", request.object.get("handShakeCode"))}
                if(!myBalAccount.get("balance")){ordersCompleted.set("requestor_accBalAsAtComp", 0)}else if(myBalAccount.get("balance")){ordersCompleted.set("requestor_accBalAsAtComp", myBalAccount.get("balance"))}
                if(!myBalAccount.get("reserved")){ordersCompleted.set("requestor_accAvailableAsAtComp",0)}else if(myBalAccount.get("available")){ordersCompleted.set("requestor_accAvailableAsAtComp", myBalAccount.get("available"))}
                if(!request.object.get("requestor").get("userNum")){ordersCompleted.set("requestor_userNum", "No data")}else if(request.object.get("requestor").get("userNum")){ordersCompleted.set("requestor_userNum", request.object.get("requestor").get("userNum"))}
                if(!request.object.get("requestor").get("ghanaPostAddress")){ordersCompleted.set("reqs_ghanaPostAddress", "No data")}else if(request.object.get("requestor").get("ghanaPostAddress")){ordersCompleted.set("reqs_ghanaPostAddress", request.object.get("requestor").get("ghanaPostAddress"))}
                if(!request.object.get("requestor").get("phone")){ordersCompleted.set("reqs_phone", "No data")}else if(request.object.get("requestor").get("phone")){ordersCompleted.set("reqs_phone", request.object.get("requestor").get("phone"))}
                if(!request.object.get("requestor").get("homeAddress")){ordersCompleted.set("reqs_homeAddress", "No data")}else if(request.object.get("requestor").get("homeAddress")){ordersCompleted.set("reqs_homeAddress", request.object.get("requestor").get("homeAddress"))}
                if(!request.object.get("requestor").get("coordinates")){ordersCompleted.set("reqs_homeCords", {latitude:0,longitude:0})}else if(request.object.get("requestor").get("coordinates")){ordersCompleted.set("reqs_homeCords", {latitude:request.object.get("requestor").get("coordinates").latitude,longitude:request.object.get("requestor").get("coordinates").longitude})}
                if(!dispatcherBalAccount.get("balance")){ordersCompleted.set("disp_accBalAsAtComp", 0)}else if(dispatcherBalAccount.get("balance")){ordersCompleted.set("disp_accBalAsAtComp", dispatcherBalAccount.get("balance"))}
                if(!request.object.get("dispatcher").get("phone")){ordersCompleted.set("disp_phone", "No data")}else if(request.object.get("dispatcher").get("phone")){ordersCompleted.set("disp_phone", request.object.get("dispatcher").get("phone"))}
                if(!request.object.get("dispatcher").get("homeAddress")){ordersCompleted.set("disp_HomeAddress", {
                    "streetName": "No data",
                    "postCode": "No data",
                    "district": "No data",
                    "city": "No data",
                    "additional": "No data"
                })}else if(request.object.get("dispatcher").get("homeAddress")){ordersCompleted.set("disp_HomeAddress", request.object.get("dispatcher").get("homeAddress"))}
                if(!request.object.get("institution_id")){ordersCompleted.set("disp_instId", "No data")}else if(request.object.get("institution_id")){ordersCompleted.set("disp_instId", request.object.get("institution_id"))}
                if(!request.object.get("dispatcher").get("ghanaPostAddress")){ordersCompleted.set("disp_ghanaPostAddress", "No data")}else if(request.object.get("dispatcher").get("ghanaPostAddress")){ordersCompleted.set("disp_ghanaPostAddress", request.object.get("dispatcher").get("ghanaPostAddress"))}
                if(!request.object.get("dispatcher").get("coordinates")){ordersCompleted.set("disp_homeCords", {latitude:0,longitude:0})}else if(request.object.get("dispatcher").get("coordinates")){ordersCompleted.set("disp_homeCords", {latitude:request.object.get("dispatcher").get("coordinates").latitude,longitude:request.object.get("dispatcher").get("coordinates").longitude})}
                if(!request.object.get("dispatcher").get("userNum")){ordersCompleted.set("disp_userNum", "No data")}else if(request.object.get("dispatcher").get("userNum")){ordersCompleted.set("disp_userNum", request.object.get("dispatcher").get("userNum"))}
                if(!request.object.get("dispatcher").get("person").get("firstname")){ordersCompleted.set("disp_name", "No data")}else if(request.object.get("dispatcher").get("person").get("firstname")){ordersCompleted.set("disp_name", request.object.get("dispatcher").get("person").get("firstname")+" "+ request.object.get("dispatcher").get("person").get("lastname"))}
                if(!request.object.get("requestor").get("person").get("firstname")){ordersCompleted.set("req_name", "No data")}else if(request.object.get("requestor").get("person").get("firstname")){ordersCompleted.set("req_name", request.object.get("requestor").get("person").get("firstname")+" "+ request.object.get("requestor").get("person").get("lastname"))}
                ordersCompleted.set("visibility", 1)
                ordersCompleted.set("visibility_status", 1)

                let savedCompOrder = ordersCompleted.save() 
                

                //Updating Order Status in Requestors Order List
                const queryOrders = new Parse.Query("orders");
                let rawOrder = queryOrders.get(request.object.get("order").get("objectId"))
                rawOrder.set("online_status", true)
                rawOrder.set("status", 3)
                let rawSavedOrder = rawOrder.save()


                //Make entry in Account Statement
                const FinStatement = Parse.Object.extend("financial_statement")
                const newStatementEntry = new FinStatement()
                newStatementEntry.set("transType", 1)
                newStatementEntry.set("credited_acc", request.object.get("dispatcher"))
                newStatementEntry.set("debited_acc", request.object.get("requestor"))
                newStatementEntry.set("asocc_task", savedCompOrder)
                newStatementEntry.set("reference", "int_pay")
                newStatementEntry.set("trans_id", uniqueTransferID(request.object.get("order").get("order_id")))
                newStatementEntry.set("internalTrans", true)
                newStatementEntry.set("amount_debited", request.object.get("order").get("total_bill"))
                newStatementEntry.set("amount_credited", request.object.get("order").get("total_bill")-(request.object.get("order").get("tax_charges")+request.object.get("order").get("service_charge")))
                newStatementEntry.set("diff_CredDebit", request.object.get("order").get("tax_charges")+request.object.get("order").get("service_charge"))
                newStatementEntry.set("discription", "Transaction transfer")

                let StatementSaved = newStatementEntry.save()  
                
                //delete data in running Orders
                const queryOrders_running = new Parse.Query("orders_running");
                queryOrders_running.equalTo("order", request.object.get("order").get(objectId))
                queryOrders_running.equalTo("requestor", request.object.get("requestor").get("objectId"))
                queryOrders_running.equalTo("dispatcher", request.object.get("dispatcher").get("objectId"))

                let sortedOrder = queryOrders_running.first()
                sortedOrder.destroy()  */

            }
            
     
    }
})