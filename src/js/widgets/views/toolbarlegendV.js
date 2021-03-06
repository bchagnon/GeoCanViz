/*
 *
 * GeoCanViz viewer / Visionneuse GéoCanViz
 * gcviz.github.io/gcviz/License-eng.txt / gcviz.github.io/gcviz/Licence-fra.txt
 *
 * Legend view widget
 */
(function() {
	'use strict';
	define(['jquery-private',
			'gcviz-vm-tblegend',
			'gcviz-i18n'
	], function($viz, tblegendVM, i18n) {
		var initialize;

		initialize = function($mapElem) {
			var $legend,
				config = $mapElem.toolbarlegend,
				mapid = $mapElem.mapframe.id,
				node = '',
				itemsTemplate = '';

			// find toolbar and start to add items
			$legend = $mapElem.find('.gcviz-tbleg-content');

			//template for recursive item loading (use i18 for title attribute because binding doesn't work)
			itemsTemplate = '<script id="itemsTmpl" type="text/html">';
				itemsTemplate += '<li class="gcviz-leg-li" data-bind="legendItemList: { expanded: expand }, attr { \'id\': id }">';
					itemsTemplate += '<div class="gcviz-leg-item gcviz-leg-imgholder"data-bind="if: displaychild.enable || customimage.enable"><div title="' + i18n.getDict('%toolbarlegend-tpexpand') + '" tabindex="0" data-bind="event: { keyup: function(data, event) { $root.toggleViewService(data, event) } }, click: function(data, event) { $root.toggleViewService(data, event) }, css: $root.determineCSS($parent, $data)"></div></div>';
					itemsTemplate += '<div class="gcviz-leg-item" data-bind="if: visibility.enable && visibility.type === 1"><input class="gcviz-leg-check" type="checkbox" title="' + i18n.getDict('%toolbarlegend-tpvis') + '" data-bind="event: { click: $root.changeItemsVisibility }, clickBubble: false, attr: { id: \'checkbox\' + id + $root.mapid }, checked: visibility.initstate"/></div>';
					itemsTemplate += '<div class="gcviz-leg-item" data-bind="if: visibility.enable && visibility.type === 2"><div data-bind="LegendRadioButtons: { value: visibility.initstate, group: \'radio\' + visibility.radioid, id: \'checkbox\' + id + $root.mapid}"></div></div>';
					itemsTemplate += '<div class="gcviz-leg-item" data-bind="HorizontalSliderDijit: { widget: $root.HorizontalSlider, extent: [opacity.min, opacity.max], value: opacity.initstate, enable: opacity.enable }, if: opacity.enable"></div>';
					itemsTemplate += '<div class="gcviz-leg-item" data-bind="if: metadata.enable"><span data-bind="attr: { id: \'span\' + id }, css: $root.determineTextCSS($data)"><a class="gcviz-legendLink" target="_blank" data-bind="attr: { href: metadata.value, title: metadata.alttext, alt: metadata.alttext }, text: label.value"></a></span></div>';
					itemsTemplate += '<div class="gcviz-leg-item" data-bind="ifnot: metadata.enable"><span data-bind="text: label.value, attr: { id: \'span\' + id }, css: $root.determineTextCSS($data)"></span></div>';
					itemsTemplate += '<div class="gcviz-legendHolderImgDiv" id="customImage" data-bind="if: customimage.enable, css: { \'gcviz-hidden\': !customimage.enable, \'gcviz-leg-limit\': $data.expand }"></span><table class="gcviz-legendTable"><tbody data-bind="foreach: $data.customimage.images"><tr><td><img class="gcviz-legendImg" data-bind="attr: { src: url, alt: label }"></img></td><td><p class="gcviz-legendImgText" data-bind="text: label"></p></td></tr></tbody></table><div data-bind="if: customimage.description !== \'\'"><span class="gcviz-legendImgDesc" data-bind="text: customimage.description"></span></div></div>';
					itemsTemplate += '<div class="gcviz-legendHolderDiv" data-bind="visible: displayfields"><div class="gcviz-legendSymbolDiv" data-bind="attr: { id: \'featureLayerSymbolFieldName\' + id }"/></div>';
					itemsTemplate += '<div class="gcviz-legendSymbolDiv" data-bind="visible: displaychild, event: { onload: $root.createSymbol($data, $element) }, attr: { id: \'featureLayerSymbol\' + graphid }, css: { \'gcviz-leg-limit\': $data.expand }"></div>';
					itemsTemplate += '<div class="gcviz-legendHolderDiv" id="childItems" data-bind="if: displaychild.enable, css: { \'gcviz-hidden\': $data.items.length === 0, \'gcviz-leg-limit\': $data.expand }"><ul class="gcviz-leg-ul" data-bind="template: { name: \'itemsTmpl\', foreach: $data.items }"></ul></div>';
				itemsTemplate += '</li>';
			itemsTemplate += '</script>';

			$legend.append(itemsTemplate);
			node += '<div data-bind="if: layersArray().length > 0"><div class="gcviz-leg-theme"><span data-bind="text: theme"></span></div></div>';
			node += '<div><ul class="gcviz-leg-ul" data-bind="template: { name: \'itemsTmpl\', foreach: $data.layersArray }"></ul></div>';
			node += '<div data-bind="if: basesArray().length > 0"><div class="gcviz-leg-theme"><span data-bind="text: base"></span><ul class="gcviz-leg-ul" data-bind="template: { name: \'itemsTmpl\', foreach: $data.basesArray }"></ul></div></div>';

			$legend.append(node);
			return (tblegendVM.initialize($legend, mapid, config));
		};

		return {
			initialize: initialize
		};
	});
}).call(this);
