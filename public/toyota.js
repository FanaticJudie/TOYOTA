//onsubmit call the validData function
function validData() {
    //checking required length of respective variables
    var customerId = document.getElementById("customerid").value,
        name = document.getElementById("username").value,
        partnum = document.getElementById("partnum").value,
        town = document.getElementById("town").value,
        price = document.getElementById("priceperpart").value,
        description = document.getElementById("description").value,
        //get quantity 
        quantity = document.getElementById("quantity").value;

    //get the span element
    //
    if (customerId == "" || customerId.match(/\s/)) {
        document.getElementById("custid").innerHTML = "CustomerID cannot be missing and cannot contain any blank spaces";
        return false;
    } else {
        document.getElementById("custid").innerHTML = "";
    }
    //
    if (name == "") {
        document.getElementById("name").innerHTML = "Customer Name cannot be missing";
        return false;
    } else {
        document.getElementById("name").style = "display: none";
    }


    //
    if (partnum == "") {
        document.getElementById("partno").innerHTML = "Part Number can not be missing";
        return false;
    } else {
        document.getElementById("partno").innerHTML = "";
    }

    //
    if (description == "") {
        document.getElementById("descript").innerHTML = "Description cannot be missing";
        return false;
    } else {
        document.getElementById("descript").innerHTML = "";
    }
    //
    if (isNaN(price) || price <= 0) {
        document.getElementById("ppp").innerHTML = "Price must be a number that is greater than zero";
        return false;
    } else {
        document.getElementById("ppp").innerHTML = "";
    }

    //
    if (isNaN(quantity) || quantity <= 0) {
        document.getElementById("qty").innerHTML = "Quantity must be a number that is greater than zero";
        return false;
    } else {
        document.getElementById("qty").innerHTML = "";
    }
    //call functions 
    cost(), computeSalesTax(), ShippingHandling(), Total();
    return true;
}
//validatedata
//compute cost 

function cost() {
    let costEl = document.getElementById("cost");
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("priceperpart").value;
    cost_ = price * quantity;
    costEl.value = `$ ${cost_}`;
    return cost_;
}

//compute sales tax 
function computeSalesTax() {
    //get towncode 
    let townCode = document.getElementById("town").value,
        isRetailer = document.getElementById("retail").checked,
        taxrate,
        salesTax,
        salesTaxEl = document.getElementById("salestax"),
        quantity = document.getElementById("quantity").value;
    let price = document.getElementById("priceperpart").value;
    cost_ = price * quantity;

    //check if is in kampala and is retailer
    if ((townCode === "KLA") && isRetailer === true) {
        taxrate = 10 / 100;
        salesTax = taxrate * cost_;
        salesTaxEl.value = `$ ${salesTax}`;
        return salesTax;

    } else if ((townCode === "MBR" || townCode === "EBB") && isRetailer === true) {
        taxrate = 5 / 100;
        salesTax = taxrate * cost_;
        salesTaxEl.value = `$ ${salesTax}`;
        return salesTax;

    } else if ((townCode === "OTH") && isRetailer === true) {
        salesTax = 0;
        salesTaxEl.value = `$ ${salesTax}`;
        return salesTax;
    } else {
        salesTax = 0;
        salesTaxEl.value = `$ ${salesTax}`;
        return salesTax;
    }
}


function ShippingHandling() {
    let shippingCost = document.getElementById("shipbill");
    let isOversize = document.getElementById("oversize").checked;
    let ups = document.getElementById("ups").checked;
    let fedex = document.getElementById("fedex").checked;
    let fedair = document.getElementById("fedair").checked;
    let upa = document.getElementById("upa").checked;
    // oversize = document.getElementById("oversize").checked;
    quantity = document.getElementById("quantity").value;
    // shipbill = ups * quantity;
    // shippingCost, 

    // shippingCost = quantity * shipbill;


    //checking if is ups and oversize
    if (ups === true && isOversize === true) {
        costWithOversize = (7 + 5) * quantity;
        shippingCost.value = `$ ${costWithOversize}`;
        return costWithOversize;

    }
    else if (ups === true && isOversize === false) {
        costWithoutOversize = 7 * quantity;
        shippingCost.value = `$ ${costWithoutOversize}`;
        return costWithoutOversize;

    }

    if (fedex === true && isOversize === true) {
        costWithOversize = (9.25 + 5) * quantity;
        shippingCost.value = `$ ${costWithOversize}`;
        return costWithOversize;

    }
    else if (fedex === true && isOversize === false) {
        costWithoutOversize = 9.25 * quantity;
        shippingCost.value = `$ ${costWithoutOversize}`;
        return costWithoutOversize;

    }


    if (fedair === true && isOversize === true) {
        costWithOversize = (12 + 5) * quantity;
        shippingCost.value = `$ ${costWithOversize}`;
        return costWithOversize;

    }
    else if (fedair === true && isOversize === false) {
        costWithoutOversize = 12 * quantity;
        shippingCost.value = `$ ${costWithoutOversize}`;
        return costWithoutOversize;

    }


    if (upa === true && isOversize === true) {
        costWithOversize = (8.5 + 5) * quantity;
        shippingCost.value = `$ ${costWithOversize}`;
        return costWithOversize;

    }
    else if (upa === true && isOversize === false) {
        costWithoutOversize = 8.5 * quantity;
        shippingCost.value = `$ ${costWithoutOversize}`;
        return costWithoutOversize;


    }


}

function Total(){
 let totalel = document.getElementById("totalbill");
    
    cost();
    computeSalesTax();
    ShippingHandling();

   totalcost = cost() + computeSalesTax() + ShippingHandling();
    totalel.value= totalcost;
    return cost;

}




















