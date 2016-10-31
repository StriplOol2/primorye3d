( function ( $ ){

    var MainPage = {

        order:                  '.order',
        loaderSelector:         '.order__loader',
        disableScreenSelector:  '.disable-screen',
        orderFormItemElement:   '.order__form-item-element',
        orderFormButton:        '.order__form-btn',
        orderButton:            '.order-btn',

        /**
         *
         * @returns {*}
         */
        init: function (options) {
            this.bindings();
        },

        bindings: function () {
            var self = this;
            // order button
            $(this.orderButton).on("click", function (event) {
                event.preventDefault();
                $(self.disableScreenSelector).show();
                $(self.orderFormItemElement).val('');
                $(self.order).show();
            });

            // de active disable screen
            $(this.disableScreenSelector).on("click", function () {
                $(self.disableScreenSelector).hide();
                $(self.order).hide();
            });

            // ORDER
            $(this.orderFormButton).on("click", function () {
                event.preventDefault();
                var name  = $('.order #name').val();
                var phone = $('.order #phone').val();
                var data = {
                    name: name,
                    phone: phone
                };
                $(this.loaderSelector).show();
                $.post('/api/order', data, function () {
                        $(self.disableScreenSelector).hide();
                        $(self.order).hide();
                    })
                    .fail(function () {

                    })
                    .always(function () {
                        $(self.loaderSelector).hide();
                    });
            });
        }
    };

    $.fn.initMainPage = function (options) {
        if (!options) {
            options = {};
        }

        var mainPage = Object.create(MainPage);
        return mainPage.init(options);
    };

    $.fn.initMainPage.options = {
        // urlListArticles: null,
        // urlParents: null,
        // showArticles: false,
        // treeStrategy: 'filter',
        // selectedNode: null,
        // excludedNode: null,
        // articleContentEditorInstance: 'editor-description',
        // selectors: {
        //     sectionTree : '.section-tree',
        //     articleList : '.article-list',
        //     deleteLink  : '.delete-element',
        //     previewLink : '.preview-element',
        //     articleContent : '#editor-description'
        // }
    }

})(jQuery, window);
