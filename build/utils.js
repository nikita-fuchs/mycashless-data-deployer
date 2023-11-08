"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnknownProps = exports.checkAndAutocomplete = void 0;
const entryType = {
    operation_id: "number",
    operation_name: "string",
    operator_id: "number",
    operator_name: "string",
    operator_mobile: "number",
    operator_email: "string",
    device_mac_address: "string",
    device_name: "string",
    area_name: "string",
    device_ip_address: "string",
    device_model: "string",
    transaction_uid: "string",
    transaction_number: "number",
    transaction_type: "string",
    payment_type: "string",
    balance: "number",
    promo: "number",
    transaction_status: "string",
    transaction_created_time: "string",
    client_name: "string",
    avatar_link: "string",
    code: "string",
    nfc_id: "string",
    sales: "number",
    product_uid: "string",
    product_name: "string",
    price: "number",
    discount: "number",
    promotional: "bool",
    vendor_name: "string",
    vendor_email: "string",
    category_uid: "string",
    category_name: "string",
    quantity: "number",
    transactionitem_status: "string",
    transactionitem_created_time: "string",
    tokens: "string",
    token_number: "number",
};
const checkAndAutocomplete = (entry) => {
    //1. check if data contains all required fields
    let newEntry = {};
    for (let key in entryType) {
        if (entry[key] == undefined) {
            // console.log("Record is missing expected data: " + key)
            newEntry[key] = entryType[key] == "number" ? 0 : entryType[key] == "string" ? "_" : entryType[key] == "bool" ? false : undefined;
        }
        else if (["price", "sales", "balance"].includes(key)) {
            newEntry[key] = Math.round(entry[key] * 100); //multiply by 10 to get rid of decimals
        }
        else {
            newEntry[key] = entry[key];
        }
    }
    //2. check if data contains any unexpected fields
    for (let key in entry) {
        if (entryType[key] == undefined) {
            console.log("Record contains unexpected data: " + key);
            console.log("aborting.");
            process.exit(1);
        }
    }
    return newEntry;
};
exports.checkAndAutocomplete = checkAndAutocomplete;
const getUnknownProps = (entries) => {
    let unknowns = new Set(); //2. check if data contains any unexpected fields
    entries.forEach((entry) => {
        for (let key in entry) {
            if (entryType[key] == undefined) {
                console.log("Record contains unexpected data: " + key);
                unknowns.add(key);
            }
        }
    });
    return unknowns;
};
exports.getUnknownProps = getUnknownProps;
