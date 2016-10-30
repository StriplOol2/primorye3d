( function ( $ ){

    var MainPage = {

        /**
         *
         * @returns {*}
         */
        init: function (options) {
            this.bindings();
        },

        bindings: function () {
            $('.order-btn').on("click", function (event) {
                event.preventDefault();
                $('.disable-screen').show();
                $('.order').show();
            });
            $('.disable-screen').on("click", function () {
                $('.disable-screen').hide();
                $('.order').hide();
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