// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/CostAnalysis/update-project-cost.html":'\x3cdiv class\x3d"esriCTProjectListMainContainer"\x3e\r\n  \x3c!-- // list --\x3e\r\n  \x3cdiv class\x3d"esriCTProjectListChildContainer esriCTHidden" data-dojo-attach-point\x3d"projectListChildContainer"\x3e\x3c/div\x3e\r\n  \x3c!-- // button --\x3e\r\n  \x3cdiv class\x3d"esriCTUpdateButtonContainer esriCTHidden" data-dojo-attach-point\x3d"updateButtonParentContainer"\x3e\r\n    \x3cdiv class\x3d"jimu-btn jimu-state-disabled esriCTUpdateEquationBtnDisabled" data-dojo-attach-point\x3d"updateCostEquationButton"\r\n      data-dojo-attach-event\x3d"onclick:_updateCostEquation" role\x3d"button" aria-label\x3d"${nls.updateCostEquationPanel.updateButtonTextForm}"\x3e${nls.updateCostEquationPanel.updateButtonTextForm}\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"noFeatureFoundScreen" class\x3d"esriCTNoFeatureFoundScreen esriCTHidden"\x3e${nls.updateCostEquationPanel.updateProjectNoProject}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dijit/_WidgetBase dojo/Evented dijit/_TemplatedMixin dojo/_base/lang dojo/_base/array dojo/dom-construct jimu/dijit/CheckBox dojo/dom-class dojo/on dojo/text!./update-project-cost.html dojo/promise/all esri/tasks/QueryTask esri/tasks/query jimu/dijit/Message esri/graphic dojo/dom-attr dojo/keys dojo/_base/event".split(" "),function(y,z,A,B,f,k,v,C,l,w,D,q,r,t,E,F,u,x,G){return y([z,A,B],{templateString:D,_updateCostProjectSelectAllCheckBox:null,_filteredProjectNameOptions:null,
constructor:function(a){a&&f.mixin(this,a)},postCreate:function(){this.inherited(arguments);this.own(w(this.updateCostEquationButton,"keydown",f.hitch(this,function(a){if(a.keyCode===x.ENTER||a.keyCode===x.SPACE)G.stop(a),this._updateCostEquation()})))},startup:function(){this.inherited(arguments);this.loadingIndicator.show();this._initializeData();this._filteredProjectNameOptions=k.filter(this.projectNameOptions,f.hitch(this,function(a){return a.label!==this.nls.createLoadProject.selectProject}));
0<this._filteredProjectNameOptions.length?this._displayProjectCostEquationList():this._displayNoFeatureFoundScreen();this.loadingIndicator.hide()},_displayNoFeatureFoundScreen:function(){l.remove(this.noFeatureFoundScreen,"esriCTHidden")},_initializeData:function(){this._filteredProjectNameOptions=this._updateCostProjectSelectAllCheckBox=null},_displayProjectCostEquationList:function(){l.remove(this.projectListChildContainer,"esriCTHidden");l.remove(this.updateButtonParentContainer,"esriCTHidden");
this._updateCostProjectRow(this.nls.updateCostEquationPanel.updateProjectCostSelectProjectTitle,!0);k.forEach(this._filteredProjectNameOptions,f.hitch(this,function(a){this._updateCostProjectRow(a)}));this.emit("updateProjectCostWidgetLoaded")},_updateCostProjectRow:function(a,c){var b=v.create("div",{"class":"esriCTUpdateCostRowMainNode"},this.projectListChildContainer);if(c){l.add(b,"esriCTUpdateCostSelectAll");var d=a}else l.add(b,"esriCTUpdateCostProjectRow"),d=a.label;b=v.create("div",{"class":"esriCTCheckBoxParentNode"},
b);d=new C({"class":"esriCTProjectNameCheckBox",checked:!1,label:d,tabindex:"-1","aria-label":d},b);c?this._updateCostProjectSelectAllCheckBox=d:a.checkbox=d;this.own(w(d,"change",f.hitch(this,function(e){c?this._selectAllUpdateCostCheckBox(e):this._maintainSelectAllState()})))},_selectAllUpdateCostCheckBox:function(a){k.forEach(this._filteredProjectNameOptions,f.hitch(this,function(c){c.checkbox.setValue(a);a&&(u.set(this.updateCostEquationButton,"tabindex","0"),this.updateLastFocusNode(this.updateCostEquationButton,
this.widgetDomNode))}))},_maintainSelectAllState:function(){var a=!0;var c=!1;k.forEach(this._filteredProjectNameOptions,f.hitch(this,function(b){b.checkbox.getValue()||(a=!1);b.checkbox.getValue()&&(c=!0)}));c?(l.remove(this.updateCostEquationButton,"jimu-state-disabled esriCTUpdateEquationBtnDisabled"),u.set(this.updateCostEquationButton,"tabindex","0"),this.updateLastFocusNode(this.updateCostEquationButton,this.widgetDomNode)):(l.add(this.updateCostEquationButton,"jimu-state-disabled esriCTUpdateEquationBtnDisabled"),
u.set(this.updateCostEquationButton,"tabindex","-1"),this.setTabindexOfUpdateProjectCost(!0,this.widgetDomNode));a?(this._updateCostProjectSelectAllCheckBox.check(!0),this.updateLastFocusNode(this.updateCostEquationButton,this.widgetDomNode)):(this._updateCostProjectSelectAllCheckBox.uncheck(!0),c||this.setTabindexOfUpdateProjectCost(!0,this.widgetDomNode))},_updateCostEquation:function(){this.loadingIndicator.show();var a=this._getProjectGuid(),c=this.layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable).layerObject;
this._getAssets(a,c)},_getProjectGuid:function(){var a=[];k.forEach(this._filteredProjectNameOptions,f.hitch(this,function(c){c.checkbox.getValue()&&a.push(c.globalIdValue)}));return a},_getAssets:function(a,c){var b={};b.assetsDeferredList=this._getAssetsDeferred(a,c);q(b).then(f.hitch(this,function(d){var e=[];var h={};k.forEach(d.assetsDeferredList.features,f.hitch(this,function(g){g.hasOwnProperty("attributes")&&g.attributes.hasOwnProperty(this.config.assetTableFields.ASSETGUID)&&e.push(g.attributes[this.config.assetTableFields.ASSETGUID]);
h[g.attributes[this.config.assetTableFields.ASSETGUID]]=g.attributes}));this._getAssetLayers(e,h)}),f.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.updateCostEquationPanel.updateProjectCostError)}))},_getAssetsDeferred:function(a,c){a=this.config.assetTableFields.PROJECTGUID+" IN ('"+a.join("','")+"')";c=new r(c.url);var b=new t;b.outFields=["*"];b.where=a;b.returnGeometry=!1;b.outSpatialReference=this.map.spatialReference;return c.execute(b).promise},_getAssetLayers:function(a,
c){var b={};k.forEach(this.config.layerSettings,f.hitch(this,function(d){var e=this.layerInfosObj.getLayerInfoById(d.id);e&&e.layerObject&&e.layerObject.globalIdField&&(b[d.id]=this._getAssetLayerDeferred(d,a))}));q(b).then(f.hitch(this,function(d){d=this._createProjectAssetRelationship(d);d=this._createAssetProjectRelationship(d,a);this._getAssetsGuidName(c,d)}),f.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.updateCostEquationPanel.updateProjectCostError)}))},_getAssetsGuidName:function(a,
c){var b={},d=this.map.getLayer(this.config.projectSettings.costingGeometryLayer),e;for(e in a)if(a.hasOwnProperty(e)){var h=a[e][this.config.assetTableFields.GEOGRAPHYGUID];""!==h&&null!==h&&void 0!==h&&(b[e]=this._getAssetGuidDeferred(d,h))}q(b).then(f.hitch(this,function(g){g=this._getAssetGuidNameRelation(g);this._compareAssetsInfoWithConfiguration(c,a,g)}),f.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.updateCostEquationPanel.updateProjectCostError)}))},_getAssetGuidNameRelation:function(a){var c=
{},b;for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b].features[0].attributes[this.config.projectSettings.geographyField]);return c},_getAssetGuidDeferred:function(a,c){c=a.globalIdField+" \x3d '"+c+"'";a=new r(a.url);var b=new t;b.outFields=[this.config.projectSettings.geographyField];b.where=c;b.returnGeometry=!1;b.outSpatialReference=this.map.spatialReference;return a.execute(b).promise},_compareAssetsInfoWithConfiguration:function(a,c,b){var d=[],e;for(e in a)if(a.hasOwnProperty(e)){var h=this._getUpdateAssetGraphic(this.config.costingInfoSettings[a[e]],
c,e,b);h&&d.push(h)}0<d.length?this._updateAssetCostingInfo(d):(this.loadingIndicator.hide(),this._showMessage(this.nls.updateCostEquationPanel.updateProjectCostSuccess))},_getUpdateAssetGraphic:function(a,c,b,d){var e=null;k.forEach(a,f.hitch(this,function(h){var g=h.scenario,H=h.featureTemplate,m=h.geography,n=c[b][this.config.assetTableFields.SCENARIO],I=c[b][this.config.assetTableFields.TEMPLATENAME];var p=d.hasOwnProperty(b)?d[b]:c[b][this.config.assetTableFields.GEOGRAPHYGUID];if(""===g||null===
g)g=null;if(""===m||null===m)m=null;if(""===n||null===n)n=null;if(""===p||null===p)p=null;H===I&&m===p&&g===n&&(g={},g[this.config.assetTableFields.OBJECTID]=c[b][this.config.assetTableFields.OBJECTID],g[this.config.assetTableFields.COSTEQUATION]=h.costEquation,e=new F(null,null,g,null))}));return e},_updateAssetCostingInfo:function(a){this.layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable).layerObject.applyEdits(null,a,null,f.hitch(this,function(){this.loadingIndicator.hide();
this._showMessage(this.nls.updateCostEquationPanel.updateProjectCostSuccess)}),f.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.updateCostEquationPanel.updateProjectCostError)}))},_createAssetProjectRelationship:function(a,c){var b={};k.forEach(c,f.hitch(this,function(d){for(var e in a)a.hasOwnProperty(e)&&-1<a[e].indexOf(d)&&(b[d]=e)}));return b},_createProjectAssetRelationship:function(a){var c={},b;for(b in a)if(a.hasOwnProperty(b)){var d=this._getRelatedAssetGuidArr(a[b]);
c[b]=d}return c},_getRelatedAssetGuidArr:function(a){var c=[];k.forEach(a.features,f.hitch(this,function(b){b.hasOwnProperty("attributes")&&c.push(b.attributes[a.globalIdFieldName])}));return c},_getAssetLayerDeferred:function(a,c){c=this.layerInfosObj.getLayerInfoById(a.id).layerObject.globalIdField+" IN ('"+c.join("','")+"')";a=new r(a.url);var b=new t;b.outFields=["*"];b.where=c;b.returnGeometry=!1;b.outSpatialReference=this.map.spatialReference;return a.execute(b).promise},_showMessage:function(a){(new E({message:a})).message=
a}})});