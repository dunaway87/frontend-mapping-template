var tmpl = require('SidebarLayout.tmpl');



module.exports = Backbone.Marionette.LayoutView.extend({
	template: tmpl,
	className: 'sidebar',

	onShow: function(options){
		

		
	},
		initialize: function(options){
			this.options = options;
			this.model = new Backbone.Model();
		},


	}); 

