$(document).ready(function($http) {
/*
    new SplitViewNavigator('body', "Menu");
    angular.bootstrap(jQuery('.splitViewNavigator_root'));

    var compile = angular.injector(['ng']).get('$compile');
    var scope = angular.injector(['ng']).get('$rootScope');
    
    window.splitViewNavigator.pushSidebarView({
        title: "",
        backLabel: null,
        view: '',
    });
*/
    var compile = angular.injector(['ng']).get('$compile');
    var scope = angular.injector(['ng']).get('$rootScope');

    scope.$apply($('body'));
    var view = compile('<div id="container"><ul ng-init="options = [{name:"John", age:25}, {name:"Mary", age:28}] "><li> {{options.length }} </li></ul></div>')(scope);
    $('body').append(view);    
});

function pushBody(view) {
    window.splitViewNavigator.pushBodyView(view);
}
