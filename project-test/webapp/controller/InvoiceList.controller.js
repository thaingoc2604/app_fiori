sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ngsc.projecttest.controller.InvoiceList", {
		formatter: formatter,

		onInit : function () {
			var oV = new JSONModel({
                currency1: "EURRR"
            });
            this.getView().setModel(oV, "view_list");
		},
        onFilterInvoices: function(oEvent){
			// build filter array
			var aFilter = []; // tao mot mang rỗng
			var sQuery = oEvent.getParameter("query"); // get data input box search 
			if (sQuery) { // check box input not inital
				// append data input box search into array aFilter
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList"); // lay id của List Item
			var oBinding = oList.getBinding("items"); // lay tat ca phan tu của List mình cần tim
			// tu data của list mình loc ra những giá trị bằng giá trị nhập ở ô search
			oBinding.filter(aFilter); 
		},
		onPress: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Second", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		}
	});
});