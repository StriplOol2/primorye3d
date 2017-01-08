( function ( $, document ){

    var MainPage = {

        order:                  '.order',
        loaderSelector:         '.order__loader',
        disableScreenSelector:  '.disable-screen',
        orderFormItemElementSelector:   '.order__form-item-element',
        orderFormButtonSelector:'.order__form-btn',
        orderButton:            '.order-btn',
        orderFormError:         '.order__form-error',
        orderCloseSelector:     '.order__close',
        exampleElementLinkSelector: '.carousel__element a',
        panoramIframeModalSelector: '.panoram-iframe',

        /**
         *
         * @returns {*}
         */
        init: function (options) {
            var self = this;
            $(document).keyup(function(e) {
                if (e.keyCode == 27 && $(self.disableScreenSelector).is(':visible')) {
                    self.hideOrder();
                }  // esc
            });
            var $root = $('html, body');
            $('.menu__anchor-link').click(function() {
                var href = $.attr(this, 'href');
                $root.animate({
                    scrollTop: $(href).offset().top
                }, 500, function () {
                    window.location.hash = href;
                });
                return false;
            });
            this.bindings();
        },

        bindings: function () {
            var self = this;
            // order button
            $(this.orderButton).on("click", function (event) {
                var orderDescription = $.trim($(this).prev().find('.main').html());
                event.preventDefault();
                $(self.disableScreenSelector).show();
                $(self.orderFormItemElementSelector).val('');
                $('.order #description').val(orderDescription);
                $(self.order).fadeIn();
            });

            $(this.exampleElementLinkSelector).on("click", function (event) {
                event.preventDefault();
                var srcPanoram = $(this).attr("href");
                $('iframe').attr("src", srcPanoram);
                $(self.disableScreenSelector).show();
                $(self.panoramIframeModalSelector).fadeIn();
            });

            // de active disable screen
            $(this.disableScreenSelector).on("click", function () {
                self.hideAllModal();
            });

            // ORDER
            $(this.orderCloseSelector).on("click", function () {
                self.hideAllModal();
            });
            $(this.orderFormButtonSelector).on("click", function (event) {
                event.preventDefault();
                var name        = $('.order #name').val();
                var phone       = $('.order #phone').val();
                var description = $('.order #description').val();
                var data = {
                    name: name,
                    phone: phone,
                    description: description
                };
                $(self.loaderSelector).show();
                $.post('/api/order', data, function () {
                        self.hideOrder();
                    })
                    .fail(function () {
                        $(self.orderFormError).show();
                        $(self.loaderSelector).fadeOut();

                    })
                    .always(function () {

                    });
            });
        },

        hideAllModal: function () {
            var self = this;
            $(self.order).fadeOut('fast', (function () {
                $(self.loaderSelector).hide();
            }));
            $(self.disableScreenSelector).fadeOut();

            $(self.panoramIframeModalSelector).fadeOut('fast', (function () {
                $(self.loaderSelector).hide();
            }));
            $(self.disableScreenSelector).fadeOut();
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

})(jQuery, document);
