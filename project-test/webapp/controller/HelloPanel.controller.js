sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment"
], function(Controller, MessageToast,JSONModel,ResourceModel, Fragment) {
    'use strict';
    
    return Controller.extend("ngsc.projecttest.controller.HelloPanel", {
        onInit: function () {
        
            var oData = {
                create_data: {
                    name : "NgocPT1"
                }
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            // set i18n on view
            var i18nModel = new ResourceModel({
                bundleName : "ngsc.projecttest.i18n.i18n"
            }); 
            this.getView().setModel(i18nModel, "i18n");
        },
        _onShowHello : function (){
            //tao doi tuong oBundle 
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            // read text from oData
            var sRead = this.getView().getModel().getProperty("/create_data/name");
            // read text from i18n
            var sMessage = oBundle.getText("helloMsg", [sRead]);
        
            // message
           MessageToast.show(sMessage);
        },
        
        showFragment : function () {
          //create dialog 
            if(!this.pDialog){
                this.pDialog = Fragment.load({
                    name: "ngsc.projecttest.view.HelloDialog"
                });
            }
            this.pDialog.then(function(oDialog) {
                oDialog.open();
            })
        },
        onClose : function () {
            this.byId("helloDialog").close(); // Đóng dialog
         },
         onAfterDialogClose: function(oEvent) { //remove contents of dialog after it has been closed
            oEvent.getSource().destroy();
          }

        
    });
});