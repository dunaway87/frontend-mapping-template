
var routes = require('routes/AppRoutes');

var tmpl = require('MapView.tmpl');
var SidebarView = require('views/SidebarLayout');
var MapContainerTemplate = require('MapContainer.tmpl');

//MapView
module.exports = Backbone.Marionette.LayoutView.extend({
	template:tmpl,

	regions:{
		map:"#map-container",
		sidebar_container:"#sidebar-container"
	},

	
	

	onShow:function(){
		require.ensure([], function() {
			require("leaflet/leaflet.css");
			require("leaflet/leaflet.js");
			require("leaflet/leaflet-src.js");
		});

		

		this.options.wmsLayer={};
		this.options.map={};

		
		this.showSidebar(this.options);
		this.showMap();

	},

	showSidebar:function(options){
		var sidebar_view = new SidebarView(options);
		var that = this;
		
		this.getRegion('sidebar_container').show(sidebar_view);
		
	},


	showMap:function(options){
		var that = this;
		var map_view = new MapView(that.options)
		that.getRegion('map').show(map_view);
		

	},




	initialize: function(options){
		this.options = options;

		this.model = new Backbone.Model();
	}


	}); 




var MapView = Marionette.View.extend({
	id:'map',
	template:MapContainerTemplate,

	onShow:function(){	
		var that = this;

		//this.getDomPoints();
		that.options.map = L.map('map',{
			center:[61.15,-149.9],
			zoom:4,
				
		});

		that.options.map.doubleClickZoom.disable();

	    var mapboxID ='dunaway87.hffcoej7';
			
		var	basemap = L.tileLayer('https://{s}.tiles.mapbox.com/v3/'+mapboxID+'/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
				    baselayer: true

		});
		that.options.wmsLayer = L.tileLayer.wms('http://geoblaster.info:8080/geoserver/hunts/wms',{
			 layers:'hunts:draw_hunt',
			 format: 'image/png',
        	 transparent: true,
        	 
		});


		that.options.map.addLayer(basemap)
		that.options.map.addLayer(that.options.wmsLayer)
		var lat
		var lon

		that.options.map.clicked=0;
		

		that.options.map.on('click', function(e){
			
			that.options.map.clicked = that.options.map.clicked+1;
			setTimeout(function(){
		        if(that.options.map.clicked == 1){
		        	lat = e.latlng.lat;
					lon = e.latlng.lng;
		            that.options.point_model=new Backbone.Model({
						lat:lat,
						lon:lon
					})

			
					//that.trigger('hunt:summary', that.options.point_model);               
		            that.options.map.clicked = 0;
		        }
		     }, 300);
		})

		that.options.map.on('dblclick', function(e){
		    that.options.map.clicked = 0;
		    that.options.map.setView(new L.LatLng( e.latlng.lat, e.latlng.lng),that.options.map.getZoom()+1)
		   
		});




	},


	initialize:function(options){
		this.options=options
	}
				
})




