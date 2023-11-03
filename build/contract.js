"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractCode = void 0;
exports.contractCode = `

@compiler >= 6

include "String.aes"
include "List.aes"

contract MyCashlessRecords =

    record state = {
        entries : map(int, entry), 
        testvalue: int,
        entry_count: int}

    record entry = {
        operation_id: int,
        operation_name: string,
        operator_id: int,
        operator_name: string,
        operator_mobile: int,
        operator_email: string,
        device_mac_address: string,
        device_name: string,
        area_name: string,
        device_ip_address: string,
        device_model: string,
        transaction_uid: string,
        transaction_number: int,
        transaction_type: string,
        payment_type: string,
        balance: int,
        promo: int,
        transaction_status: string,
        transaction_created_time: string,
        client_name: string,
        avatar_link: string,
        code: string,
        nfc_id: string,
        sales: int,
        product_uid: string,
        product_name: string,
        price: int,
        discount: int,
        promotional: bool,
        vendor_name: string,
        vendor_email: string,
        category_uid: string,
        category_name: string,
        quantity: int,
        transactionitem_status: string,
        transactionitem_created_time: string
        }  

    stateful entrypoint init() = 
        {   entries = {},
            testvalue = 42,
            entry_count = 0}
    
    stateful entrypoint add_entries(entries: list(entry)) =
        let entryAmount = List.length(entries)
        [put(state{entries[c] = entry}) | c <- [0 .. entryAmount], entry <- entries]
        put(state{ entry_count @ c = c + entryAmount })

    public entrypoint read_test_value() : int =
        state.testvalue
    
    public entrypoint return_caller() : address =
        Call.caller

    public entrypoint cause_error() : unit =
        require(2 == 1, "require failed") 

    `;
