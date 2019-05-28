function BannerController() {
    const ctrl = this;

    ctrl.$onInit = () => {
        ctrl.background = '/images/main-banner.jpg'
    }
}

angular.module('CartApp')
.component("dynamicBanner", {
    bindings: {
        background: '<'
    },
    template: `
    <img src={{$ctrl.background}} class="banner-container">
    `,
    controller: BannerController
});