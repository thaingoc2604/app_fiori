sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, ResourceModel,Fragment) {
        "use strict";

        return Controller.extend("ngsc.projecttest.controller.Main", {
            onInit: function () {
                var oData = {
                    create_data: {
                        name : "NgocPT1"
                    }
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
                // set model cho invoice list
                var oViewModel = new JSONModel({
                    currency: "EUR"
                });
                this.getView().setModel(oViewModel, "view");

                // set i18n on view
                var i18nModel = new ResourceModel({
                    bundleName : "ngsc.projecttest.i18n.i18n"
                }); 
                this.getView().setModel(i18nModel, "i18n");
            },
            _onButton : function () { 
               // read message from i18n model
               var oBundle = this.getView().getModel("i18n").getResourceBundle();
               // read test from oData
               var sCreate_Data = this.getView().getModel().getProperty("/create_data/name");
               var sMsg =  oBundle.getText("helloMsg", [sCreate_Data]);

               // show message
               MessageToast.show(sMsg);
            }
        
        });
    });
