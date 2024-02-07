// jQuery.sap.require("amer.zmm.zvendorpoconf.utils.jszip");
// jQuery.sap.require("amer.zmm.zvendorpoconf.utils.xlsx");
// sap.ui.define([
//     "sap/m/MessageToast",
//     "sap/ui/core/Fragment",
//     "sap/ui/model/json/JSONModel",
// 	"sap/ui/core/util/Export",
// 	"sap/ui/core/util/ExportTypeCSV"
// ], function(MessageToast,Fragment,JSONModel){
//     'use strict';

//     return {
//         onInit: function(){
//             var oTableModel = new JSONModel();
//             this.getView().setModel(oTableModel, "tableData");
//         },   
//         VendorConfirmation: function(oEvent) {
// 			if (!this.pDialog) {
// 				this.pDialog = this.loadFragment({
// 					name: "amer.zmm.zvendorpoconf.ext.view.fragments.vendorConfirmation",
//                     controller: this
// 				});
// 			} 
// 			this.pDialog.then(function(oDialog) {
// 				this.pDialog = oDialog;
// 				oDialog.open();
//                 this.handleVendorSelectedItems();
// 			}.bind(this));
//         },

//         handleVendorClosePress: function(oEvent){
//             this.pDialog.close();
//             this.pDialog.destroy();
//             this.pDialog = null;
//         },

//         handleVendorSelectedItems: function(oEvent){
//             var oVendorTable = sap.ui.getCore().byId("amer.zmm.zvendorpoconf::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCC_MM_VEN_PO_CNF--GridTable");
//             var selectedIndices = oVendorTable.getPlugins()[0].getSelectedIndices();
//             var selectedVendors = []
//             for(var i=0; i < selectedIndices.length; i++){
//                 selectedVendors.push(oVendorTable.getBinding("rows").getContexts()[selectedIndices[i]].getObject());
//             }
//             var oVendorModel = new sap.ui.model.json.JSONModel({
//                 "selectedVendorData" : selectedVendors
//             });

//             this.getView().byId("idSelectedVendorsTable").setModel(oVendorModel);


//         },
	
//         handleVendorSubmitPress : function(){
//             debugger;
//             var oTable = this.getView().byId("idSelectedVendorsTable");
//             var selectedIndices = oTable.getSelectedIndices();
//             var oEntry = {};
// 		    var oLineItem = [];
//             for(var i=0;i<selectedIndices.length;i++){
//                 var selectedObject = oTable.getBinding("rows").getContexts()[i].getObject();
//                 oLineItem.push({
//                     "PurchaseOrder" : selectedObject.PurchaseOrder,
//                     "PurchaseOrderItem" : selectedObject.PurchaseOrderItem,
// 					"PurchasingOrganization" : selectedObject.PurchasingOrganization,
// 					"PurchasingGroup" : selectedObject.PurchasingGroup,
// 					"Supplier" : selectedObject.Supplier,
//                     "SupplierCnfDate1" : selectedObject.SupplierCnfDate1,
//                     "SupplierCnfQty1"  : selectedObject.SupplierCnfQty1,
// 					"SupplierCnfRef1"  : selectedObject.SupplierCnfRef1,
// 					"SupplierDelayReason1"  : selectedObject.SupplierDelayReason1,
// 					"SupplierCnfDate2" : selectedObject.SupplierCnfDate2,
//                     "SupplierCnfQty2"  : selectedObject.SupplierCnfQty2,
// 					"SupplierCnfRef2"  : selectedObject.SupplierCnfRef2,
// 					"SupplierDelayReason2"  : selectedObject.SupplierDelayReason2,
// 					"SupplierCnfDate3" : selectedObject.SupplierCnfDate3,
//                     "SupplierCnfQty3"  : selectedObject.SupplierCnfQty3,
// 					"SupplierCnfRef3"  : selectedObject.SupplierCnfRef3,
// 					"SupplierDelayReason3"  : selectedObject.SupplierDelayReason3,
// 					"SupplierCnfDate4" : selectedObject.SupplierCnfDate4,
//                     "SupplierCnfQty4"  : selectedObject.SupplierCnfQty4,
// 					"SupplierCnfRef4"  : selectedObject.SupplierCnfRef4,
// 					"SupplierDelayReason4"  : selectedObject.SupplierDelayReason4
//                  //   "Handoverdate" : new Date(selectedObject.HandOverDate) 
//                 });
//             }
//             var oModel = this.getOwnerComponent().getModel();
//             var oDefGrp = oModel.getDeferredGroups();
//             oDefGrp[oDefGrp.length] = "createMultiple";
//             oModel.setDeferredGroups(oDefGrp);
//             for (var k = 0; k < oLineItem.length; k++) {
//                 oModel.create("/POVendorCnfLnsSet", oLineItem[k], {
//                     groupId: "createMultiple"
//                 });
//             }
//             oModel.submitChanges({
//                 groupId: "createMultiple",
//                 success: function (oData, oResponse) {
// 					var oTableData = [];
// 					oData.__batchResponses[0].__changeResponses.forEach((oItem,index) => {
// 						oTableData.push(oItem.data);
// 					});	
// 					this.getView().byId("idSelectedVendorsTable").getModel().setProperty("/selectedVendorData",oTableData);
// 					this.getView().byId("idSelectedVendorsTable").clearSelection();
//                     sap.m.MessageToast.show("Successfully created entried with batch");
//                 }.bind(this),
//                 error: function(error){
//                 }
//             });
//         },
//         POVendorMassConf: function(oEvent) {

//     //    MessageToast.show("Custom handler invoked.");
//     var navigationService = sap.ushell.Container.getService('CrossApplicationNavigation');
//     var hash = (navigationService && navigationService.hrefForExternal({

//         target: {
//             semanticObject: "ZMM_PO_VENDOR_CONF",
//             action:         "massConfirmation"
//         } } ) );

//         var url = window.location.href.split('#')[0] + hash;
//         sap.m.URLHelper.redirect(url, true)
//         },

//         VendorPOQuickCnf: function(oEvent) {
//         MessageToast.show("For the selected PO Lines, Confirmation line will be created with Requested Delivery date & Requested Qty");
//         },

//         openSpreadsheetUpload: async function (oEvent) {
//             if (!this.sHDialog) {
// 				this.sHDialog = this.loadFragment({
// 					name: "amer.zmm.zvendorpoconf.ext.view.fragments.spreadSheetUpload",
//                     controller: this
// 				});
// 			}
//             this.sHDialog.then(function(oDialog) {
// 				this.spreadSheetDialog = oDialog;
//                 oDialog.open();
// 				this.template = this.byId("idFileData").clone();
// 				this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
//             }.bind(this));
//         },


//     	// Split the records of the file based on the gateway time out call
// 		chunkArrayInGroups: function (arr, size) {
// 			//this function is for splitting the array into chunks of array
// 			var myArray = [];
// 			for (var i = 0; i < arr.length; i += size) {
// 				myArray.push(arr.slice(i, i + size));
// 			}
// 			return myArray;
// 		},

// 		// Function to read the file from the Excel or CSV and form JSON Model to bind it to table on UI
// 		changeFileUploader: function (e) {
// 			var file = e.getSource().oFileUpload.files[0];
// 			//Get the files from Upload control
// 			var reader = new FileReader();
// 			reader.onload = function (e) {
// 				var data = e.target.result;
// 				var workbook = XLSX.read(data, {
// 					type: "binary",
// 				});
// 				workbook.SheetNames.forEach(function (sheetName) {
// 					var xlData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
// 					var oData = JSON.stringify(xlData);
// 					this.jsonArrayData = oData;
// 				}.bind(this));
// 			}.bind(this);
// 			reader.onerror = function (ex) { };
// 			reader.readAsBinaryString(e.getSource().oFileUpload.files[0]);
// 			// this.byId("idPostMJELns").setVisible(false);
// 		},

// 		// Process the data and do the UI validations before binding to the table - Bind table with validation messages populated to Model
// 		onPress: function (oEvent) {
// 			var that = this;
// 			var model = this.getView().getModel();
// 			this.getView().byId("fileUploader").clear();
// 			var payload = {};
// 			if (this.jsonArrayData) {
// 				var template = this.template;
// 				this.jsonArrayData = JSON.parse(this.jsonArrayData);
// 			}
// 			var jsonModel = new sap.ui.model.json.JSONModel();
// 			jsonModel.setData(this.jsonArrayData);
// 			this.fileArray = this.jsonArrayData;
// 			this.byId("idFileData").setModel(jsonModel);
// 			this.byId("idFileData").bindRows("/", template);
// 	  	// this.byId("idFileData").bindAggregation("items", "/", template);
// 		// Check there are no errors in the file. then only display the validate Entries button.
// 		var fileErrors;
// 		for (var c = 0; c < this.jsonArrayData.length; c++) {
// 			if (this.jsonArrayData[c].Message) {
// 			   fileErrors = 'X';
// 			   break;
// 			}
// 		  }
// 		  if (!fileErrors){
// 			this.byId("idValidateMJELns").setVisible(true);
// 		  } else {
// 			this.byId("idValidateMJELns").setVisible(false);
// 			MessageBox.error( "Data validation errors occured. Please see Message Column for details" );
// 		  }
// 		  this.byId("idDownLoad").setVisible(true);
// 		},

// 		// Form the payload and call the batch function
// 		OnPostVCL: function (oEvent) {
// 			var that = this;
// 			if (this.jsonArrayData) {
// 				var oModel = this._oComponent.getModel();
// 				var VCLines = [];
// 				for (var i = 0; i < this.jsonArrayData.length; i++) {
// 					var payload = {
// 					"Ebeln" : this.jsonArrayData[i]["Purchasing Document"],
// 					"Ebelp" : this.jsonArrayData[i].Item,
// 					"Matnr" : "",
// 					"Menge" : this.jsonArrayData[i]["Confirmation Qty 1"],
// 					"Handoverdate" : new Date(this.jsonArrayData[i]["Confirmation Date 1"]),
// 					"Meins" : "",
// 					"Suppliercnfdate1" : new Date(this.jsonArrayData[i]["Confirmation Date 1"]),
// 					"Suppliercnfqty1" : this.jsonArrayData[i]["Confirmation Qty 1"],
// 					"Suppliercnfref1" : "",
// 					"Supplierdelayreason1" : "",
// 					"Suppliercnfdate2" : new Date(this.jsonArrayData[i]["Confirmation Date 2"]),
// 					"Suppliercnfqty2" : this.jsonArrayData[i]["Confirmation Qty 2"],
// 					"Suppliercnfref2" : "",
// 					"Supplierdelayreason2" : "",
// 					"Suppliercnfdate3" : new Date(this.jsonArrayData[i]["Confirmation Date 3"]),
// 					"Suppliercnfqty3" : this.jsonArrayData[i]["Confirmation Qty 3"],
// 					"Suppliercnfref3" : "",
// 					"Supplierdelayreason3" : "",
// 					"Suppliercnfdate4" : new Date(this.jsonArrayData[i]["Confirmation Date 4"]),
// 					"Suppliercnfqty4" : this.jsonArrayData[i]["Confirmation Qty 4"],
// 					"Suppliercnfref4" : "",
// 					"Supplierdelayreason4" : ""
// 					}

					
					
// 					this.arrayResponse = [];
// 					VCLines.push(payload);
// 					jQuery.sap.vcLinesArr = VCLines;
// 				}
// 				var dialog = new sap.m.Dialog({
// 					title: "Warning!",
// 					type: "Message",
// 					content: new sap.m.Text({
// 						text: "System will post the VC Entries now. Please confirm?"
// 					}),
// 					beginButton: new sap.m.Button({
// 						text: 'OK',
// 						press: function () {
// 							sap.ui.core.BusyIndicator.show();
// 							that.onPostDataForeground(VCLines);
// 							dialog.close();
// 						}
// 					}),
// 					endButton: new sap.m.Button({
// 						text: 'Cancel',
// 						press: function () {
// 							dialog.close();
// 						}
// 					}),
// 					afterClose: function () {
// 						dialog.destroy();
// 					}
// 				});
// 				dialog.open();
// 			}
// 		},
// 		// batch process - split the data into different batch calls and  submit batch - Gateway timeout based
// 		onPostDataForeground: function (overallRecords) {
// 			this.totalRecordsLength = overallRecords.length;
// 			var batchUrls = [];
// 			var zPostArray = [];
// 			var stlmtRulesUrl = this.getOwnerComponent().getModel().sServiceUrl;
// 			var oModel = new sap.ui.model.odata.ODataModel(stlmtRulesUrl, {
// 				json: true
// 			});
// 			var chunkArr = [];
// 			var chunkArr = this.chunkArrayInGroups(overallRecords, 400);
// 			if (jQuery.sap.flg == undefined) {
// 				jQuery.sap.flg = 0;
// 			}
// 			var splitArr = [];
// 			splitArr = chunkArr[jQuery.sap.flg];
// 			for (var i = 0; i < splitArr.length; i++) {
// 				var odatapayload = splitArr[i];
// 				batchUrls.push(oModel.createBatchOperation("/POLnsMassConfSet", "POST", odatapayload));
// 			}
// 			oModel.addBatchChangeOperations(batchUrls);
// 			oModel.setUseBatch(true);
// 			var that = this;
// 			oModel.submitBatch(function (oData, oResponse) {
// 				var arrayProcess = [];
// 				for (var b = 0; b < oData.__batchResponses[0].__changeResponses.length; b++) {
// 					arrayProcess.push(oData.__batchResponses[0].__changeResponses[b].data);
// 				}
// 				if (that.arrayResponse.length > 0) {
// 					Array.prototype.push.apply(that.arrayResponse, arrayProcess);
// 				} else {
// 					that.arrayResponse = arrayProcess;
// 				}
// 				if (that.totalRecordsLength === that.arrayResponse.length) {
// 					var template = that.template;
// 					var jsonModel = new sap.ui.model.json.JSONModel();
// 					jsonModel.setData(that.arrayResponse);
// 					that.jsonArrayData = that.arrayResponse;
// 					that.byId("idFileData").setModel(jsonModel);
// 					//	that.byId("idFileData").bindAggregation("items", "/", template);
// 					that.byId("idFileData").bindRows("/", template);
// 					sap.ui.core.BusyIndicator.hide();
// 					// Feedback Messages
// 					// Check if there are any messages from validations.
// 					var fileErrors = 'N';
// 					for (var c = 0; c < that.arrayResponse.length; c++) {
// 						if (that.arrayResponse[c].Message) {
// 						   fileErrors = 'Y';
// 						   break;
// 						}
// 					  }
// 					if ( that.arrayResponse[0].MsgTy === 'V' && fileErrors === 'Y'){
// 						MessageBox.error( that.arrayResponse[0].HeaderMessage )
// 					}
// 					if ( that.arrayResponse[0].MsgTy === 'V' && fileErrors === 'N' ){
// 						MessageBox.success( that.arrayResponse[0].HeaderMessage )
// 						that.byId("idPostMJELns").setVisible(true);
// 					}
// 					if ( that.arrayResponse[0].MsgTy === 'E'){
// 						MessageBox.error( that.arrayResponse[0].HeaderMessage )
// 						that.byId("idErrorLog").setVisible(true);
// 					}
// 					if ( that.arrayResponse[0].MsgTy === 'I'){
// 						MessageBox.success( that.arrayResponse[0].HeaderMessage )
// 						that.byId("idPostMJELns").setEnabled(false);
// 					//	that.byId("idErrorLog").setVisible(true);
// 					}
// 				}
// 				if (jQuery.sap.flg < chunkArr.length - 1) {
// 					jQuery.sap.flg++; // this will pick next set of 400 records
// 				//	this.onPostDataForeground(jQuery.sap.ordersArr); // this is a recursive function which calls itself after processing every 400 records
// 					this.onPostDataForeground(jQuery.sap.mjeLinesArr); // this is a recursive function which calls itself after processing every 400 records
// 				} else if (jQuery.sap.flg == chunkArr.length - 1) {
// 					jQuery.sap.flg = undefined; // control comes here , once all 5000 records are processed
// 				}
// 			}.bind(this),

// 				function (err) {
// 					sap.ui.core.BusyIndicator.hide();
// 				});
// 		},

// 		OnPostVCClose: function(oEvent){
// 			this.spreadSheetDialog.close();
// 		}    


//     };
// });
jQuery.sap.require("amer.zmm.zvendorpoconf.utils.jszip");
jQuery.sap.require("amer.zmm.zvendorpoconf.utils.xlsx");
sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function(MessageToast,Fragment,JSONModel){
    'use strict';

    return {
        onInit: function(){
            var oTableModel = new JSONModel();
            this.getView().setModel(oTableModel, "tableData");
        },   
        VendorConfirmation: function(oEvent) {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "amer.zmm.zvendorpoconf.ext.view.fragments.vendorConfirmation",
                    controller: this
				});
			} 
			this.pDialog.then(function(oDialog) {
				this.pDialog = oDialog;
				oDialog.open();
                this.handleVendorSelectedItems();
			}.bind(this));
        },

        handleVendorClosePress: function(oEvent){
            this.pDialog.close();
            this.pDialog.destroy();
            this.pDialog = null;
        },

        handleVendorSelectedItems: function(oEvent){
            var oVendorTable = sap.ui.getCore().byId("amer.zmm.zvendorpoconf::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCC_MM_VEN_PO_CNF--GridTable");
            var selectedIndices = oVendorTable.getPlugins()[0].getSelectedIndices();
            var selectedVendors = []
            for(var i=0; i < selectedIndices.length; i++){
                selectedVendors.push(oVendorTable.getBinding("rows").getContexts()[selectedIndices[i]].getObject());
            }
            var oVendorModel = new sap.ui.model.json.JSONModel({
                "selectedVendorData" : selectedVendors
            });

            this.getView().byId("idSelectedVendorsTable").setModel(oVendorModel);


        },
	
        handleVendorSubmitPress : function(){
            debugger;
			sap.ui.core.BusyIndicator.show();
            var oTable = this.getView().byId("idSelectedVendorsTable");
        //    var selectedIndices = oTable.getSelectedIndices();
			var oContexts = oTable.getBinding("rows").getContexts(); 
            var oEntry = {};
		    var oLineItem = [];
            for(var i=0;i<oContexts.length;i++){
             //   var selectedObject = oTable.getBinding("rows").getContexts()[i].getObject();
				// Get table items data and push them to oEntry;
				var selectedObject = oContexts[i].getObject();
			// Populate default values
			if (!selectedObject.SupplierCnfQty2) {
				 selectedObject.SupplierCnfQty2 = '0';
				};
			if (!selectedObject.SupplierCnfQty3) { selectedObject.SupplierCnfQty3 = '0'};	
			if (!selectedObject.SupplierCnfQty4) { selectedObject.SupplierCnfQty4 = '0'};

                oLineItem.push({
                    "PurchaseOrder" : selectedObject.PurchaseOrder,
                    "PurchaseOrderItem" : selectedObject.PurchaseOrderItem,
					"PurchasingOrganization" : selectedObject.PurchasingOrganization,
					"PurchasingGroup" : selectedObject.PurchasingGroup,
					"Supplier" : selectedObject.Supplier,
					"OrderQuantity"  : selectedObject.OrderQuantity,
					"PurchaseOrderQuantityUnit" : selectedObject.PurchaseOrderQuantityUnit,
				//	"DeliveryDate" : selectedObject.DeliveryDate,
					"PickUpDate" : selectedObject.PickUpDate,
                    "SupplierCnfDate1" : selectedObject.SupplierCnfDate1,
                    "SupplierCnfQty1"  : selectedObject.SupplierCnfQty1,
					"SupplierCnfRef1"  : selectedObject.SupplierCnfRef1,
					"SupplierDelayReason1"  : selectedObject.SupplierDelayReason1,
					"SupplierCnfDate2" : selectedObject.SupplierCnfDate2,
			        "SupplierCnfQty2"  : selectedObject.SupplierCnfQty2,
					"SupplierCnfRef2"  : selectedObject.SupplierCnfRef2,
					"SupplierDelayReason2"  : selectedObject.SupplierDelayReason2,
					"SupplierCnfDate3" : selectedObject.SupplierCnfDate3,
                    "SupplierCnfQty3"  : selectedObject.SupplierCnfQty3,
					"SupplierCnfRef3"  : selectedObject.SupplierCnfRef3,
					"SupplierDelayReason3"  : selectedObject.SupplierDelayReason3,
					"SupplierCnfDate4" : selectedObject.SupplierCnfDate4,
                    "SupplierCnfQty4"  : selectedObject.SupplierCnfQty4,
					"SupplierCnfRef4"  : selectedObject.SupplierCnfRef4,
					"SupplierDelayReason4"  : selectedObject.SupplierDelayReason4
                 //   "Handoverdate" : new Date(selectedObject.HandOverDate) 
                });
            }
            var oModel = this.getOwnerComponent().getModel();
            var oDefGrp = oModel.getDeferredGroups();
            oDefGrp[oDefGrp.length] = "createMultiple";
            oModel.setDeferredGroups(oDefGrp);
            for (var k = 0; k < oLineItem.length; k++) {
                oModel.create("/POVendorCnfLnsSet", oLineItem[k], {
                    groupId: "createMultiple"
                });
            }
            oModel.submitChanges({
                groupId: "createMultiple",
                success: function (oData, oResponse) {
					sap.ui.core.BusyIndicator.hide();
					var oTableData = [];
					var eBoolean = false;
					oData.__batchResponses[0].__changeResponses.forEach((oItem,index) => {
						oTableData.push(oItem.data);
						if(oItem.data.MsgTyp === "E"){
							eBoolean = true
						}
					});	
					if(eBoolean){
						sap.m.MessageBox.error("Errors occured for one of the lines, please see the highlighted lines in red");
					}else{
						sap.m.MessageBox.success("Selected PO Lines are Successfully Processed");
					}
					this.getView().byId("idSelectedVendorsTable").getModel().setProperty("/selectedVendorData",oTableData);
					this.getView().byId("idSelectedVendorsTable").clearSelection();
                //    sap.m.MessageToast.show("Selected PO Lines are Successfully Processed");
                }.bind(this),
                error: function(error){
					sap.ui.core.BusyIndicator.hide();	
                }
            });
        },
        POVendorMassConf: function(oEvent) {

    //    MessageToast.show("Custom handler invoked.");
    var navigationService = sap.ushell.Container.getService('CrossApplicationNavigation');
    var hash = (navigationService && navigationService.hrefForExternal({

        target: {
            semanticObject: "ZMM_PO_VENDOR_CONF",
            action:         "massConfirmation"
        } } ) );

        var url = window.location.href.split('#')[0] + hash;
        sap.m.URLHelper.redirect(url, true)
        },

        openSpreadsheetUpload: async function (oEvent) {
            if (!this.sHDialog) {
				this.sHDialog = this.loadFragment({
					name: "amer.zmm.zvendorpoconf.ext.view.fragments.spreadSheetUpload",
                    controller: this
				});
			}
            this.sHDialog.then(function(oDialog) {
				this.spreadSheetDialog = oDialog;
                oDialog.open();
				this.template = this.byId("idFileData").clone();
				this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
            }.bind(this));
        },


    	// Split the records of the file based on the gateway time out call
		chunkArrayInGroups: function (arr, size) {
			//this function is for splitting the array into chunks of array
			var myArray = [];
			for (var i = 0; i < arr.length; i += size) {
				myArray.push(arr.slice(i, i + size));
			}
			return myArray;
		},

		// Function to read the file from the Excel or CSV and form JSON Model to bind it to table on UI
		changeFileUploader: function (e) {
			var file = e.getSource().oFileUpload.files[0];
			//Get the files from Upload control
			var reader = new FileReader();
			reader.onload = function (e) {
				var data = e.target.result;
				var workbook = XLSX.read(data, {
					type: "binary",
				});
				workbook.SheetNames.forEach(function (sheetName) {
					var xlData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName],
						{
							raw: false,
							defval: "",
						}
						);
					var oData = JSON.stringify(xlData);
					this.jsonArrayData = oData;
				}.bind(this));
			}.bind(this);
			reader.onerror = function (ex) { };
			reader.readAsBinaryString(e.getSource().oFileUpload.files[0]);
			// this.byId("idPostMJELns").setVisible(false);
		},

		// let excelSheets = workbook.SheetNames.map((sheetName) => {
		// 	// Convert the excel sheet to JSON
		// 	let excelSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
		// 	  raw: false,
		// 	  defval: "",
		// 	});

		//Function to get the sheet data and change the keys as per the fixed layout
		tableDataKeyMap: function(jsonArrayData){
			var tableKeys = new Set(["PurchaseOrder","PurchaseOrderItem","SupplierCnfDate1","SupplierCnfQty1","SupplierCnfRef1","SupplierDelayReason1","SupplierCnfDate2","SupplierCnfQty2","SupplierCnfRef2","SupplierDelayReason2","SupplierCnfDate3","SupplierCnfQty3","SupplierCnfRef3","SupplierDelayReason3","SupplierCnfDate4","SupplierCnfQty4","SupplierCnfRef4","SupplierDelayReason4"]) ;
			var tableRowsValuesOnly = jsonArrayData.map( oRow => {
			const newRow = {};
				Object.values(oRow).map( (oCell,index) => {
					const key = [...tableKeys][index];
					newRow[key] = oCell;
				});
				return newRow;
			});
			return tableRowsValuesOnly
		},		
		// Process the data and do the UI validations before binding to the table - Bind table with validation messages populated to Model
		onPress: function (oEvent) {
			var that = this;
			var model = this.getView().getModel();
			this.getView().byId("fileUploader").clear();
			var payload = {};
			if (this.jsonArrayData) {
				var template = this.template;
				this.jsonArrayData = JSON.parse(this.jsonArrayData);
			}
			var jsonModel = new sap.ui.model.json.JSONModel();
			jsonModel.setData(this.jsonArrayData);
			this.mappedNewKeydata = this.tableDataKeyMap(this.jsonArrayData);
			jsonModel.setData(this.mappedNewKeydata);
		//	this.fileArray = this.jsonArrayData;
			this.byId("idFileData").setModel(jsonModel);
			this.byId("idFileData").bindRows("/", template);
	  	// this.byId("idFileData").bindAggregation("items", "/", template);
		// Check there are no errors in the file. then only display the validate Entries button.
		var fileErrors;
		for (var c = 0; c < this.jsonArrayData.length; c++) {
			if (this.jsonArrayData[c].Message) {
			   fileErrors = 'X';
			   break;
			}
		  }

		},

		// Form the payload and call the batch function
		OnPostVCL: function (oEvent) {
			var that = this;
			if (this.jsonArrayData) {
				var oModel = this._oComponent.getModel();
				var VCLines = [];
				for (var i = 0; i < this.mappedNewKeydata.length; i++) {
					var payload = {
					"PurchaseOrder" : this.mappedNewKeydata[i]["PurchaseOrder"],
					"PurchaseOrderItem" : this.mappedNewKeydata[i]["PurchaseOrderItem"],
					"SupplierCnfDate1" : new Date(this.mappedNewKeydata[i]["SupplierCnfDate1"]),
					"SupplierCnfQty1" : this.mappedNewKeydata[i]["SupplierCnfQty1"],
					"SupplierCnfRef1" :	this.mappedNewKeydata[i]["SupplierCnfRef1"],
					"SupplierDelayReason1" : this.mappedNewKeydata[i]["SupplierDelayReason1"],
					"SupplierCnfDate2" : new Date(this.mappedNewKeydata[i]["SupplierCnfDate2"]),
					"SupplierCnfQty2" : this.mappedNewKeydata[i]["SupplierCnfQty2"],
					"SupplierCnfRef2" :	this.mappedNewKeydata[i]["SupplierCnfRef2"],
					"SupplierDelayReason2" : this.mappedNewKeydata[i]["SupplierDelayReason2"],
					"SupplierCnfDate3" : new Date(this.mappedNewKeydata[i]["SupplierCnfDate3"]),
					"SupplierCnfQty3" : this.mappedNewKeydata[i]["SupplierCnfQty3"],
					"SupplierCnfRef3" :	this.mappedNewKeydata[i]["SupplierCnfRef3"],
					"SupplierDelayReason3" : this.mappedNewKeydata[i]["SupplierDelayReason3"],
					"SupplierCnfDate4" : new Date(this.mappedNewKeydata[i]["SupplierCnfDate4"]),
					"SupplierCnfQty4" : this.mappedNewKeydata[i]["SupplierCnfQty4"],
					"SupplierCnfRef4" :	this.mappedNewKeydata[i]["SupplierCnfRef4"],
					"SupplierDelayReason4" : this.mappedNewKeydata[i]["SupplierDelayReason4"],
					"Message" : ""
					}		

					
					
					this.arrayResponse = [];
					VCLines.push(payload);
					jQuery.sap.vcLinesArr = VCLines;
				}
				var dialog = new sap.m.Dialog({
					title: "Warning!",
					type: "Message",
					content: new sap.m.Text({
						text: "System will create the confirmation lines now. Please confirm?"
					}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							sap.ui.core.BusyIndicator.show();
							that.onPostDataForeground(VCLines);
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancel',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function () {
						dialog.destroy();
					}
				});
				dialog.open();
			}
		},
		// batch process - split the data into different batch calls and  submit batch - Gateway timeout based
		onPostDataForeground: function (overallRecords) {
			this.totalRecordsLength = overallRecords.length;
			var batchUrls = [];
			var zPostArray = [];
			var stlmtRulesUrl = this.getOwnerComponent().getModel().sServiceUrl;
			var oModel = new sap.ui.model.odata.ODataModel(stlmtRulesUrl, {
				json: true
			});
			var chunkArr = [];
			var chunkArr = this.chunkArrayInGroups(overallRecords, 400);
			if (jQuery.sap.flg == undefined) {
				jQuery.sap.flg = 0;
			}
			var splitArr = [];
			splitArr = chunkArr[jQuery.sap.flg];
			for (var i = 0; i < splitArr.length; i++) {
				var odatapayload = splitArr[i];
				batchUrls.push(oModel.createBatchOperation("/POVendorCnfLnsSet", "POST", odatapayload));
			}
			oModel.addBatchChangeOperations(batchUrls);
			oModel.setUseBatch(true);
			var that = this;
			oModel.submitBatch(function (oData, oResponse) {
				var arrayProcess = [];
				for (var b = 0; b < oData.__batchResponses[0].__changeResponses.length; b++) {
					arrayProcess.push(oData.__batchResponses[0].__changeResponses[b].data);
				}
				if (that.arrayResponse.length > 0) {
					Array.prototype.push.apply(that.arrayResponse, arrayProcess);
				} else {
					that.arrayResponse = arrayProcess;
				}
				if (that.totalRecordsLength === that.arrayResponse.length) {
					var template = that.template;
					var jsonModel = new sap.ui.model.json.JSONModel();
					jsonModel.setData(that.arrayResponse);
					that.jsonArrayData = that.arrayResponse;
					that.byId("idFileData").setModel(jsonModel);
					//	that.byId("idFileData").bindAggregation("items", "/", template);
					that.byId("idFileData").bindRows("/", template);
					sap.ui.core.BusyIndicator.hide();
					// Feedback Messages
					// Check if there are any messages from validations.
					var fileErrors = 'N';
					for (var c = 0; c < that.arrayResponse.length; c++) {
						if (that.arrayResponse[c].Message) {
						   fileErrors = 'Y';
						   break;
						}
					  }
					if ( that.arrayResponse[0].MsgTy === 'V' && fileErrors === 'Y'){
						MessageBox.error( that.arrayResponse[0].HeaderMessage )
					}
					if ( that.arrayResponse[0].MsgTy === 'V' && fileErrors === 'N' ){
						MessageBox.success( that.arrayResponse[0].HeaderMessage )
						that.byId("idPostMJELns").setVisible(true);
					}
					if ( that.arrayResponse[0].MsgTy === 'E'){
						MessageBox.error( that.arrayResponse[0].HeaderMessage )
						that.byId("idErrorLog").setVisible(true);
					}
					if ( that.arrayResponse[0].MsgTy === 'I'){
						MessageBox.success( that.arrayResponse[0].HeaderMessage )
						that.byId("idPostMJELns").setEnabled(false);
					//	that.byId("idErrorLog").setVisible(true);
					}
				}
				if (jQuery.sap.flg < chunkArr.length - 1) {
					jQuery.sap.flg++; // this will pick next set of 400 records
				//	this.onPostDataForeground(jQuery.sap.ordersArr); // this is a recursive function which calls itself after processing every 400 records
					this.onPostDataForeground(jQuery.sap.mjeLinesArr); // this is a recursive function which calls itself after processing every 400 records
				} else if (jQuery.sap.flg == chunkArr.length - 1) {
					jQuery.sap.flg = undefined; // control comes here , once all 5000 records are processed
				}
			}.bind(this),

				function (err) {
					sap.ui.core.BusyIndicator.hide();
				});
		},

		// OnPostVCClose: function(oEvent){
		// 	this.spreadSheetDialog.close();
		// },
		
		VendorPOQuickCnf: function(oEvent) {
			sap.m.MessageBox.confirm("For the selected PO Lines, Confirmation line will be created with Requested Delivery date & Requested Qty", {
				title: "Confirm",
				styleClass: "",
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				emphasizedAction: sap.m.MessageBox.Action.OK,
				initialFocus: null,
				textDirection: sap.ui.core.TextDirection.Inherit,
				onClose: (oAction) => {
				  if (oAction === "OK") {
					debugger;
					var oVendorTable = sap.ui.getCore().byId("amer.zmm.zvendorpoconf::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCC_MM_VEN_PO_CNF--GridTable");
					var selectedIndices = oVendorTable.getPlugins()[0].getSelectedIndices();
					var oLineItem = [];
					for(var i=0;i<selectedIndices.length;i++){
					//	var selectedObject = oVendorTable.getBinding("rows").getContexts()[i].getObject();
					    var selectedObject = oVendorTable.getBinding("rows").getContexts()[selectedIndices[i]].getObject();
						oLineItem.push({
							"PurchaseOrder" : selectedObject.PurchaseOrder,
							"PurchaseOrderItem" : selectedObject.PurchaseOrderItem,
							"PurchasingOrganization" : selectedObject.PurchasingOrganization,
							"PurchasingGroup" : selectedObject.PurchasingGroup,
							"Supplier" : selectedObject.Supplier,
							"OrderQuantity"  : selectedObject.OrderQuantity,
							"PurchaseOrderQuantityUnit" : selectedObject.PurchaseOrderQuantityUnit,
						//	"DeliveryDate" : selectedObject.DeliveryDate,
							"PickUpDate" : selectedObject.PickUpDate,	
							"SupplierCnfDate1" : selectedObject.PickUpDate,
							"SupplierCnfQty1"  : selectedObject.OrderQuantity

						 //   "Handoverdate" : new Date(selectedObject.HandOverDate) 
						});
					}
					var oModel = this.getOwnerComponent().getModel();
					var oDefGrp = oModel.getDeferredGroups();
					oDefGrp[oDefGrp.length] = "createMultiple";
					oModel.setDeferredGroups(oDefGrp);
					for (var k = 0; k < oLineItem.length; k++) {
						oModel.create("/POVendorCnfLnsSet", oLineItem[k], {
							groupId: "createMultiple"
						});
					}
					oModel.submitChanges({
						groupId: "createMultiple",
						success: function (oData, oResponse) {
							debugger;
							var oTableData = [];
							var eBoolean = false;
							oData.__batchResponses[0].__changeResponses.forEach((oItem,index) => {
								oTableData.push(oItem.data);
								if(oItem.data.MsgTyp === "E"){
									eBoolean = true
								}
							});	
							this.quickConfirmationDialog(oTableData, eBoolean);
							// this.getView().byId("idSelectedVendorsTable").getModel().setProperty("/selectedVendorData",oTableData);
							// this.getView().byId("idSelectedVendorsTable").clearSelection();
							// sap.m.MessageToast.show("Successfully created entried with batch");
						}.bind(this),
						error: function(error){
						}
					});
				  }
				}
			  });
        },

		quickConfirmationDialog: function(oTableData, eBoolean) {
			if (!this.qDialog) {
				this.qDialog = this.loadFragment({
					name: "amer.zmm.zvendorpoconf.ext.view.fragments.quickConfirmationDialog",
                    controller: this
				});
			} 
			this.qDialog.then(function(oDialog) {
				this.qDialog = oDialog;
				// var oQuickJsonModel = new JSONModel(oTableData);
				
				var oQuickVendorModel = new sap.ui.model.json.JSONModel({
					"quickVendorData" : oTableData
				});
				// oDialog.setModel(oQuickVendorModel);
				this.getView().byId("idQuickConfirmationTable").setModel(oQuickVendorModel);
				oDialog.open();
				if(eBoolean){
					sap.m.MessageBox.error("Errors occured for one of the lines, please see the highlighted lines in red");
				}else{
					sap.m.MessageBox.success("Selected PO Lines are successfully processed");
				}
			}.bind(this));
        },
		OnPostVCClose: function(oEvent){
			this.spreadSheetDialog.close();
			this.getView().byId("idFileData").getModel().setData("");
		},

		handleDate: function(value){
			if(value){
				var validDate = new Date(value);
				var dateFormatInstance = sap.ui.core.format.DateFormat.getDateInstance({
					style: "short"
				});
				if(isNaN(validDate.getDate())){
					return validDate;
				}else{
					return dateFormatInstance.format(validDate);
				}
			}
		},
		quickConfirmationDialogClose: function(){
			this.qDialog.close();
			this.qDialog.destroy(true);
			this.qDialog = null;
		}
    };
});